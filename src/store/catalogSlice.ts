import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CardProduct } from "../types/catalog";

interface CatalogState {
  products: CardProduct[];
  loading: boolean;
  error: string | null;
  categories: string[];
  brands: string[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;

  // Для деталей товара
  productDetails: any | null;
  productDetailsLoading: boolean;
  productDetailsError: string | null;

  // Для фильтра "в наличии"
  inStockProducts: CardProduct[];
  inStockLoading: boolean;
  inStockError: string | null;
  showOnlyInStock: boolean;
}

const initialState: CatalogState = {
  products: [],
  loading: false,
  error: null,
  categories: [],
  brands: [],
  totalProducts: 0,
  totalPages: 0,
  currentPage: 1,

  productDetails: null,
  productDetailsLoading: false,
  productDetailsError: null,

  inStockProducts: [],
  inStockLoading: false,
  inStockError: null,
  showOnlyInStock: false,
};

const formatPrice = (price: number) => price.toLocaleString("ru-RU");

const calculatePricePerMonth = (price: number) => {
  const monthly = Math.round(price / 12);
  return `от ${monthly.toLocaleString("ru-RU")} руб. в месяц`;
};

const getPrices = (prices: any[]) => {
  const main = prices.find((p) => p.type === "price");
  const old = prices.find((p) => p.type === "price1c");

  const price = main?.price ?? 0;
  const oldprice = old && old.price > price ? old.price : 0;

  return {
    price,
    oldprice,
    priceFormatted: formatPrice(price),
    oldpriceFormatted: oldprice ? formatPrice(oldprice) : "",
  };
};

const transformApiToCardProduct = (product: any): CardProduct | null => {
  if (!product.offers?.length) return null;

  const mainOffer = product.offers[0];

  const { price, oldprice, priceFormatted, oldpriceFormatted } = getPrices(
    mainOffer.prices || []
  );

  if (price === 0) return null;

  return {
    image: `https://via.placeholder.com/300x200/4A6FA5/FFFFFF?text=${encodeURIComponent(
      product.name.slice(0, 30)
    )}`,
    hit: Math.random() > 0.8,
    sale: oldprice > 0,
    section: "Каталог",
    status: mainOffer.warehouses?.some((w: any) => w.count > 0)
      ? "В наличии"
      : "Нет в наличии",
    title: product.name,
    price: priceFormatted,
    oldprice: oldpriceFormatted,
    pricePerMonth: calculatePricePerMonth(price),
    brand: product.brand,
    model: product.model,
    offer_id: mainOffer.offer_id,
    product_id: product.product_id,
    articul_supplier: mainOffer.offer_id,
    created_at: "",
  };
};

export const fetchCatalog = createAsyncThunk(
  "catalog/fetchCatalog",
  async (
    { page, perPage }: { page: number; perPage: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://admin.velo-shop.ru/api/catalog/tree/page=${page}/perPage=${perPage}`
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (!data.success) throw new Error("API error");

      const products: CardProduct[] = [];
      const brands = new Set<string>();

      data.data.forEach((product: any) => {
        const cardProduct = transformApiToCardProduct(product);
        if (cardProduct) {
          products.push(cardProduct);
          if (product.brand) brands.add(product.brand);
        }
      });

      return {
        products,
        categories: [],
        brands: Array.from(brands),
        totalProducts: data.meta.total,
        totalPages: data.meta.total_pages,
        currentPage: page,
      };
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : "Unknown error");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "catalog/fetchProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://admin.velo-shop.ru/api/catalog/tree/page=1/perPage=100`
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (!data.success) throw new Error("API error");

      // Ищем нужный товар по product_id
      const product = data.data.find(
        (item: any) => item.product_id === productId
      );

      if (!product) throw new Error("Товар не найден");

      return product; // Возвращаем полные данные товара
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : "Unknown error");
    }
  }
);

export const fetchAllInStockProducts = createAsyncThunk(
  "catalog/fetchAllInStockProducts",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Загружаю ВСЕ товары в наличии...");

      // Загружаем все страницы товаров
      const allProducts: any[] = [];
      let page = 1;
      const perPage = 100; // Максимум за один запрос

      // Сначала загружаем первую страницу чтобы узнать общее количество
      const firstResponse = await fetch(
        `https://admin.velo-shop.ru/api/catalog/tree/page=1/perPage=1`
      );

      if (!firstResponse.ok) throw new Error(`HTTP ${firstResponse.status}`);

      const firstData = await firstResponse.json();

      if (!firstData.success) throw new Error("API error");

      const totalProducts = firstData.meta.total;
      const totalPages = Math.ceil(totalProducts / perPage);

      console.log(`Всего товаров: ${totalProducts}, страниц: ${totalPages}`);

      // Загружаем все страницы параллельно
      const pagePromises = [];

      for (let page = 1; page <= totalPages; page++) {
        pagePromises.push(
          fetch(
            `https://admin.velo-shop.ru/api/catalog/tree/page=${page}/perPage=${perPage}`
          ).then((response) => response.json())
        );
      }

      // Ждем загрузки всех страниц
      const allPagesData = await Promise.all(pagePromises);

      // Собираем все товары
      allPagesData.forEach((pageData) => {
        if (pageData.success && pageData.data) {
          allProducts.push(...pageData.data);
        }
      });

      console.log(`Загружено ${allProducts.length} товаров`);

      // Фильтруем только товары в наличии
      const inStockProductsRaw = allProducts.filter(isProductInStock);
      console.log(`Товаров в наличии (сырых): ${inStockProductsRaw.length}`);

      // Преобразуем в CardProduct
      const inStockProducts: CardProduct[] = [];
      const brands = new Set<string>();

      inStockProductsRaw.forEach((product: any) => {
        const cardProduct = transformApiToCardProduct(product);
        if (cardProduct) {
          // Принудительно устанавливаем статус "В наличии"
          cardProduct.status = "В наличии";
          inStockProducts.push(cardProduct);
          if (product.brand) brands.add(product.brand);
        }
      });

      console.log(`Преобразовано в CardProduct: ${inStockProducts.length}`);

      return {
        products: inStockProducts,
        categories: [],
        brands: Array.from(brands),
        totalProducts: inStockProducts.length,
        totalPages: 1,
        currentPage: 1,
      };
    } catch (e) {
      console.error("Ошибка загрузки всех товаров:", e);
      return rejectWithValue(e instanceof Error ? e.message : "Unknown error");
    }
  }
);

const isProductInStock = (product: any): boolean => {
  // Проверяем наличие товара по его offers
  if (!product.offers || product.offers.length === 0) return false;

  // Проверяем все offers товара
  return product.offers.some((offer: any) => {
    if (!offer.warehouses || offer.warehouses.length === 0) return false;
    return offer.warehouses.some((warehouse: any) => warehouse.count > 0);
  });
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.productDetailsError = null;
      state.inStockError = null;
    },
    toggleInStockFilter: (state, action: PayloadAction<boolean>) => {
      state.showOnlyInStock = action.payload;
      if (!action.payload) {
        state.inStockProducts = [];
      }
    },
    clearInStockProducts: (state) => {
      state.inStockProducts = [];
      state.inStockError = null;
      state.showOnlyInStock = false;
    },
    clearProductDetails: (state) => {
      state.productDetails = null;
      state.productDetailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCatalog.fulfilled,
        (
          state,
          action: PayloadAction<{
            products: CardProduct[];
            categories: string[];
            brands: string[];
            totalProducts: number;
            totalPages: number;
            currentPage: number;
          }>
        ) => {
          state.loading = false;
          state.products = action.payload.products;
          state.categories = action.payload.categories;
          state.brands = action.payload.brands;
          state.totalProducts = action.payload.totalProducts;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.productDetailsLoading = true;
        state.productDetailsError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productDetailsLoading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.productDetailsError = action.payload as string;
      })
      .addCase(fetchAllInStockProducts.pending, (state) => {
        state.inStockLoading = true;
        state.inStockError = null;
      })
      .addCase(
        fetchAllInStockProducts.fulfilled,
        (
          state,
          action: PayloadAction<{
            products: CardProduct[];
            categories: string[];
            brands: string[];
            totalProducts: number;
            totalPages: number;
            currentPage: number;
          }>
        ) => {
          state.inStockLoading = false;
          state.inStockProducts = action.payload.products;
          state.showOnlyInStock = true;
        }
      )
      .addCase(fetchAllInStockProducts.rejected, (state, action) => {
        state.inStockLoading = false;
        state.inStockError = action.payload as string;
        state.showOnlyInStock = false;
      });
  },
});

// ОДИН экспорт со всеми экшенами
export const {
  clearError,
  toggleInStockFilter,
  clearInStockProducts,
  clearProductDetails,
} = catalogSlice.actions;

export default catalogSlice.reducer;

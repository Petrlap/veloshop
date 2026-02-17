import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CardProduct, ProductApi, OfferApi, PriceApi, CatalogApiResponse } from "../types/catalog";

interface CatalogState {
  products: CardProduct[];
  loading: boolean;
  error: string | null;
  categories: string[];
  brands: string[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  perPage: number;

  productDetails: ProductApi | null;
  productDetailsLoading: boolean;
  productDetailsError: string | null;

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
  perPage: 20, // Значение по умолчанию

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

const getPrices = (prices: PriceApi[]) => {
  if (!prices.length) return { price: 0, oldprice: 0, priceFormatted: "", oldpriceFormatted: "" };
  
  const priceValues = prices.map(p => p.price);
  const minPrice = Math.min(...priceValues);
  const maxPrice = Math.max(...priceValues);
  
  const oldprice = minPrice !== maxPrice ? maxPrice : 0;

  return {
    price: minPrice,
    oldprice,
    priceFormatted: formatPrice(minPrice),
    oldpriceFormatted: oldprice ? formatPrice(oldprice) : "",
  };
};

const isOfferInStock = (offer: OfferApi): boolean => {
  return offer.stock?.data && offer.stock.data.length > 0;
};

const transformApiToCardProduct = (product: ProductApi): CardProduct | null => {
  if (!product.offers?.data || !product.offers.data.length) {
    return null;
  }

  const allPrices: PriceApi[] = [];
  product.offers.data.forEach(offer => {
    if (offer.prices?.data) {
      allPrices.push(...offer.prices.data);
    }
  });

  if (allPrices.length === 0) return null;

  const { price, oldprice, priceFormatted, oldpriceFormatted } = getPrices(allPrices);

  if (price === 0) return null;

  const hasStock = product.offers.data.some(isOfferInStock);
  const model = (product as any)["model "] || "";

  return {
    image: `https://via.placeholder.com/300x200/4A6FA5/FFFFFF?text=${encodeURIComponent(
      product.name.slice(0, 30)
    )}`,
    hit: Math.random() > 0.8,
    sale: oldprice > 0,
    section: "Каталог",
    status: hasStock ? "В наличии" : "Нет в наличии",
    title: product.name,
    price: priceFormatted,
    oldprice: oldpriceFormatted,
    pricePerMonth: calculatePricePerMonth(price),
    brand: product.brand,
    model: model,
    offer_id: product.offers.data[0]?.offer_id || "",
    product_id: product.product_id,
    articul_supplier: product.offers.data[0]?.articul_supplier || "",
    created_at: "",
    total_offers: product.offers.data.length,
  };
};

export const fetchCatalog = createAsyncThunk(
  "catalog/fetchCatalog",
  async ({ page, perPage }: { page: number; perPage: number }, { rejectWithValue }) => {
    try {
      console.log(`Загружаю каталог: страница ${page}, по ${perPage} товаров`);
      
      const response = await fetch(
        `https://admin.velo-shop.ru/api/catalog/products?page=${page}&per-page=${perPage}`
      );
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      
      console.log("Ответ API с пагинацией:", data);

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error("Неверная структура ответа API");
      }

      const products: CardProduct[] = [];
      const brands = new Set<string>();

      data.data.forEach((product: ProductApi) => {
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
        totalProducts: data.meta?.total || products.length,
        totalPages: data.meta?.last_page || 1,
        currentPage: data.meta?.current_page || page,
        perPage: data.meta?.per_page || perPage,
      };
    } catch (e) {
      console.error("Ошибка в fetchCatalog:", e);
      return rejectWithValue(e instanceof Error ? e.message : "Unknown error");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "catalog/fetchProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      // Загружаем все страницы пока не найдем товар
      let page = 1;
      const perPage = 100;
      
      while (true) {
        const response = await fetch(
          `https://admin.velo-shop.ru/api/catalog/products?page=${page}&per-page=${perPage}`
        );
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("Неверная структура ответа API");
        }

        const product = data.data.find((item: ProductApi) => item.product_id === productId);
        
        if (product) return product;
        
        // Если дошли до последней страницы и не нашли
        if (page >= (data.meta?.last_page || 1)) break;
        
        page++;
      }
      
      throw new Error("Товар не найден");
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : "Unknown error");
    }
  }
);

export const fetchAllInStockProducts = createAsyncThunk(
  "catalog/fetchAllInStockProducts",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Загружаю все товары в наличии...");
      
      let allProducts: ProductApi[] = [];
      let page = 1;
      const perPage = 100;
      let totalPages = 1;
      
      // Загружаем первую страницу чтобы узнать количество страниц
      const firstResponse = await fetch(
        `https://admin.velo-shop.ru/api/catalog/products?page=1&per-page=${perPage}`
      );
      
      if (!firstResponse.ok) throw new Error(`HTTP ${firstResponse.status}`);
      
      const firstData = await firstResponse.json();
      
      if (!firstData.data || !Array.isArray(firstData.data)) {
        throw new Error("Неверная структура ответа API");
      }
      
      totalPages = firstData.meta?.last_page || 1;
      allProducts = [...firstData.data];
      
      console.log(`Всего страниц: ${totalPages}`);
      
      // Загружаем остальные страницы
      const pagePromises = [];
      for (page = 2; page <= totalPages; page++) {
        pagePromises.push(
          fetch(`https://admin.velo-shop.ru/api/catalog/products?page=${page}&per-page=${perPage}`)
            .then(res => res.json())
        );
      }
      
      const remainingPagesData = await Promise.all(pagePromises);
      
      remainingPagesData.forEach(pageData => {
        if (pageData.data && Array.isArray(pageData.data)) {
          allProducts.push(...pageData.data);
        }
      });
      
      console.log(`Загружено ${allProducts.length} товаров`);

      const inStockProductsRaw = allProducts.filter(isProductInStock);
      console.log(`Товаров в наличии (сырых): ${inStockProductsRaw.length}`);

      const inStockProducts: CardProduct[] = [];
      const brands = new Set<string>();

      inStockProductsRaw.forEach((product: ProductApi) => {
        const cardProduct = transformApiToCardProduct(product);
        if (cardProduct) {
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

const isProductInStock = (product: ProductApi): boolean => {
  if (!product.offers?.data?.length) return false;
  return product.offers.data.some((offer: OfferApi) => {
    return offer.stock?.data && offer.stock.data.length > 0;
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
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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
            perPage: number;
          }>
        ) => {
          state.loading = false;
          state.products = action.payload.products;
          state.categories = action.payload.categories;
          state.brands = action.payload.brands;
          state.totalProducts = action.payload.totalProducts;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
          state.perPage = action.payload.perPage;
          console.log("Состояние обновлено:", {
            товаров: state.products.length,
            страница: state.currentPage,
            всего_страниц: state.totalPages,
            всего_товаров: state.totalProducts
          });
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

export const {
  clearError,
  toggleInStockFilter,
  clearInStockProducts,
  clearProductDetails,
  setCurrentPage,
} = catalogSlice.actions;

export default catalogSlice.reducer;
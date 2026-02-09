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

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
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
      });
  },
});

export const { clearError } = catalogSlice.actions;
export default catalogSlice.reducer;

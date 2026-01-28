import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CardProduct, CatalogApiResponse } from '../types/catalog';

interface CatalogState {
  products: CardProduct[];
  loading: boolean;
  error: string | null;
  categories: string[];
  brands: string[];
}

const initialState: CatalogState = {
  products: [],
  loading: false,
  error: null,
  categories: [],
  brands: [],
};

// Функция для генерации случайной цены (заглушка, т.к. в API нет цен)
const generatePrice = () => {
  const price = Math.floor(Math.random() * 50000) + 5000;
  return price.toLocaleString('ru-RU');
};

const generateOldPrice = () => {
  const shouldHaveOldPrice = Math.random() > 0.7;
  if (!shouldHaveOldPrice) return '';
  
  const price = Math.floor(Math.random() * 60000) + 6000;
  return price.toLocaleString('ru-RU');
};

// Функция для расчета цены в месяц
const calculatePricePerMonth = (priceStr: string) => {
  const price = parseInt(priceStr.replace(/\s/g, ''));
  const monthly = Math.round(price / 12);
  return `от ${monthly.toLocaleString('ru-RU')} руб. в месяц`;
};

// Функция преобразования данных API в формат CardProduct
const transformApiToCardProduct = (product: any): CardProduct[] => {
  const cardProducts: CardProduct[] = [];
  
  // Если есть offers - создаем карточки для каждого offer
  if (product.offers && product.offers.length > 0) {
    product.offers.forEach((offer: any) => {
      const price = generatePrice();
      const oldprice = generateOldPrice();
      
      cardProducts.push({
        // Заглушка для изображения - в реальном проекте нужно получать из API
        image: `https://via.placeholder.com/300x200/4A6FA5/FFFFFF?text=${encodeURIComponent(offer.name.substring(0, 30))}`,
        hit: Math.random() > 0.8, // 20% товаров - хиты
        sale: oldprice !== '', // Скидка если есть старая цена
        section: product.group_name || 'Велосипеды',
        status: 'В наличии', // Заглушка
        title: offer.name,
        price: price,
        oldprice: oldprice,
        pricePerMonth: calculatePricePerMonth(price),
        // Дополнительные поля
        brand: product.brand,
        model: product.model,
        seazon: product.seazon,
        offer_id: offer.offer_id,
        product_id: product.product_id,
        articul_supplier: offer.articul_supplier,
        created_at: offer.created_at,
      });
    });
  } else {
    // Если нет offers, создаем из самого product
    const price = generatePrice();
    const oldprice = generateOldPrice();
    
    cardProducts.push({
      image: `https://via.placeholder.com/300x200/4A6FA5/FFFFFF?text=${encodeURIComponent(product.name.substring(0, 30))}`,
      hit: Math.random() > 0.8,
      sale: oldprice !== '',
      section: product.group_name || 'Велосипеды',
      status: 'В наличии',
      title: product.name,
      price: price,
      oldprice: oldprice,
      pricePerMonth: calculatePricePerMonth(price),
      brand: product.brand,
      model: product.model,
      seazon: product.seazon,
      offer_id: product.product_id,
      product_id: product.product_id,
      articul_supplier: product.product_id,
      created_at: product.created_at,
    });
  }
  
  return cardProducts;
};

// Async thunk для загрузки каталога
export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://admin.velo-shop.ru/api/catalog/tree');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CatalogApiResponse = await response.json();
      
      if (!data.success) {
        throw new Error('API returned unsuccessful response');
      }
      
      // Преобразуем данные API в формат для карточек
      const transformedProducts: CardProduct[] = [];
      const categories = new Set<string>();
      const brands = new Set<string>();
      
      data.data.products.forEach(product => {
        const cardProducts = transformApiToCardProduct(product);
        transformedProducts.push(...cardProducts);
        
        // Собираем уникальные категории и бренды
        if (product.group_name) categories.add(product.group_name);
        if (product.brand) brands.add(product.brand);
      });
      
      return {
        products: transformedProducts,
        categories: Array.from(categories),
        brands: Array.from(brands),
      };
      
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // Дополнительные reducers при необходимости
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
      .addCase(fetchCatalog.fulfilled, (state, action: PayloadAction<{
        products: CardProduct[],
        categories: string[],
        brands: string[]
      }>) => {
        state.loading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.brands = action.payload.brands;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = catalogSlice.actions;
export default catalogSlice.reducer;
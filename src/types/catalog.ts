export interface OfferApi {
  id: number;
  offer_id: string;
  product_id: string;
  articul_supplier: string;
  name: string;
  meta: {
    title: string | null;
    description: string | null;
    keywords: string | null;
  };
  attributes: any[];
  created_at: string;
  updated_at: string;
}

export interface ProductApi {
  id: number;
  product_id: string;
  name: string;
  brand: string;
  model: string;
  seazon: string;
  group_name: string;
  meta: {
    title: string | null;
    description: string | null;
    keywords: string | null;
  };
  offers: OfferApi[];
  offers_count: number;
  created_at: string;
  updated_at: string;
}

export interface CatalogApiResponse {
  success: boolean;
  data: {
    products: ProductApi[];
  };
  meta?: {
    products_count: number;
    offers_count: number;
    timestamp: string;
  };
}

// Тип для карточки товара (адаптированный под ваш компонент Card)
export interface CardProduct {
  image: string; // Будем генерировать или использовать заглушку
  hit: boolean;
  sale: boolean;
  section: string; // group_name из API
  status: string; // "В наличии" или другое
  title: string; // name из API
  price: string; // Форматированная цена
  oldprice: string; // Форматированная старая цена (если есть)
  pricePerMonth: string; // Рассчитываем
  // Дополнительные поля из API
  brand: string;
  model: string;
  offer_id: string;
  product_id: string;
  articul_supplier: string;
  created_at: string;
  // Опциональные поля для дополнительной информации
  has_more_offers?: boolean;
  total_offers?: number;
}

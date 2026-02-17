export interface PriceApi {
  id: number;
  offer_id: number;
  price_type: string | null;
  price: number;
}

export interface AttributeApi {
  id: number;
  value: string;
}

export interface OfferApi {
  id: number;
  name: string;
  product_id: number;
  offer_id: string;
  vcode: string | null;
  articul_supplier: string;
  is_active: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  attributes: OfferAttributes; // Изменено
  prices: {
    data: PriceApi[];
  };
  stock: {
    data: any[];
  };
}

export interface ProductApi {
  id: number;
  name: string;
  product_id: string;
  category_id: number;
  brand: string;
  "model ": string;
  seazon: string;
  offers: {
    data: OfferApi[];
  };
  attributes: ProductAttributes; // Изменено
}

export interface CatalogApiResponse {
  data: ProductApi[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface CardProduct {
  image: string;
  hit: boolean;
  sale: boolean;
  section: string;
  status: string;
  title: string;
  price: string;
  oldprice: string;
  pricePerMonth: string;
  brand: string;
  model: string;
  offer_id: string;
  product_id: string;
  articul_supplier: string;
  created_at: string;
  has_more_offers?: boolean;
  total_offers?: number;
}

export interface AttributeValue {
  id: number;
  value: string;
}

export interface ProductAttributes {
  data: AttributeValue[];
}

export interface OfferAttributes {
  data: AttributeValue[];
}
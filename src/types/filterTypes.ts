// types/filterTypes.ts

// Типы для фильтров, совместимые с FullCatalog
export interface FilterState {
    price: {
      min: number;
      max: number;
      current: [number, number];
    };
    brands: string[];
    types: string[];
    wheelDiameter: string[];
    rimType: string[];
    years: string[];
    equipment: string[];
    height: {
      from: string;
      to: string;
    };
    gender: string[];
    colors: string[];
    fork: string[];
    brakes: string[];
    material: string[];
    // Дополнительные фильтры
    inStock: boolean;
    withDiscount: boolean;
    withVideo: boolean;
    sortBy: string;
  }
  
  // Параметры для URL (сериализованная версия)
  export interface FilterQueryParams {
    price_from?: string;
    price_to?: string;
    brands?: string; // через запятую
    types?: string; // через запятую
    wheel_diameter?: string; // через запятую
    rim_type?: string; // через запятую
    years?: string; // через запятую
    height_from?: string;
    height_to?: string;
    gender?: string; // через запятую
    colors?: string; // через запятую
    fork?: string; // через запятую
    brakes?: string; // через запятую
    material?: string; // через запятую
    in_stock?: string; // 'true'/'false'
    with_discount?: string; // 'true'/'false'
    with_video?: string; // 'true'/'false'
    sort_by?: string;
  }
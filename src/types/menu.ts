export interface MenuItem {
  id: number;
  title: string;
  url: string;
  icon: string | null;
  order: number;
  is_active: boolean;
  seo_title: string;
  target: "_self" | "_blank";
  class: string | null;
  created_at: string;
  updated_at: string;
  children?: MenuItem[]; // Добавляем поддержку вложенных элементов
}

export interface MenuType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Menu {
  id: number;
  name: string;
  description: string | null;
  menu_type_id: number;
  menu_type: MenuType;
  is_active: boolean;
  items: MenuItem[];
  items_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface MenuApiResponse {
  success: boolean;
  data: {
    menus: Menu[];
    meta?: {
      total_menus: number;
      total_items: number;
      timestamp: string;
    };
  };
}

export interface MenuState {
  menus: Menu[];
  topMenu: MenuItem[]; // Топ меню (header_top) с сохранением вложенности
  footerMenus: Menu[]; // Все меню для футера (тип footer)
  loading: boolean;
  error: string | null;
}

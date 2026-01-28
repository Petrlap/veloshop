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
}

export interface MenuApiResponse {
  success: boolean;
  data: {
    menus: Menu[];
  };
}

export interface MenuState {
  menus: Menu[];
  topMenu: MenuItem[]; // Топ меню (header_top)
  mainMenu: MenuItem[]; // Основное меню
  loading: boolean;
  error: string | null;
}

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MenuState, MenuApiResponse, MenuItem } from "../types/menu";

const initialState: MenuState = {
  menus: [],
  topMenu: [], // Верхнее меню (тип top_header)
  footerMenus: [], // Все меню для футера (тип footer)
  loading: false,
  error: null,
};

export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://admin.velo-shop.ru/api/menu/tree");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MenuApiResponse = await response.json();

      if (!data.success) {
        throw new Error("API returned unsuccessful response");
      }

      return data.data.menus;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload;

        // Находим верхнее меню (top_header)
        const headerMenu = action.payload.find(
          (menu) => menu.menu_type?.name === "top_header"
        );
        
        // Сохраняем все пункты верхнего меню (с сохранением вложенности)
        state.topMenu = headerMenu?.items?.filter(item => item.is_active) ?? [];

        // Находим все меню для футера (footer)
        state.footerMenus = action.payload.filter(
          (menu) => menu.menu_type?.name === "footer"
        );
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = menuSlice.actions;
export default menuSlice.reducer;
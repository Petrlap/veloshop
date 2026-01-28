import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MenuState, MenuApiResponse } from "../types/menu";

const initialState: MenuState = {
  menus: [],
  topMenu: [], // Топ меню
  mainMenu: [], // Основное меню
  loading: false,
  error: null,
};

// Async thunk для загрузки меню
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

        // Разделяем меню по типам
        const topMenu = action.payload.find(
          (menu) => menu.menu_type.name === "header_top"
        );

        const mainMenu = action.payload.find(
          (menu) =>
            menu.menu_type.name === "header" || menu.name === "Основное меню"
        );

        state.topMenu = topMenu?.items || [];
        state.mainMenu = mainMenu?.items || [];
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = menuSlice.actions;
export default menuSlice.reducer;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchMenu } from "../store/menuSlice";

export const useMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем состояние меню из Redux store
  const {
    menus, // Все меню
    topMenu, // Пункты верхнего меню (с сохранением вложенности)
    footerMenus, // Все меню для футера
    loading,
    error,
  } = useSelector((state: RootState) => state.menu);

  // Загружаем меню при первом рендере, если нет данных
  useEffect(() => {
    // Проверяем, есть ли уже загруженные данные
    if (menus.length === 0 && !loading) {
      dispatch(fetchMenu());
    }
  }, [dispatch, menus.length, loading]);

  return {
    menus, // Все меню (массив объектов Menu)
    topMenu, // Пункты верхнего меню (массив MenuItem с возможными children)
    footerMenus, // Все меню для футера (массив объектов Menu)
    loading, // boolean - идет ли загрузка
    error, // string | null - ошибка загрузки

    // Вспомогательные функции для удобства
    getMenuByType: (typeName: string) => {
      return menus.find((menu) => menu.menu_type?.name === typeName);
    },

    getMenuById: (id: number) => {
      return menus.find((menu) => menu.id === id);
    },

    // Функция для получения плоского списка всех пунктов меню определенного типа
    getFlatMenuItems: (typeName: string) => {
      const menu = menus.find((m) => m.menu_type?.name === typeName);
      return menu?.items?.filter((item) => item.is_active) ?? [];
    },
  };
};

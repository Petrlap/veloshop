import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchMenu } from "../store/menuSlice";

export const useMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем состояние меню из Redux store
  const {
    topMenu, // Топ меню (header_top)
    mainMenu, // Основное меню
    loading,
    error,
  } = useSelector((state: RootState) => state.menu);

  // Загружаем меню при первом рендере
  useEffect(() => {
    if (mainMenu.length === 0 && !loading) {
      dispatch(fetchMenu());
    }
  }, [dispatch, mainMenu.length, loading]);

  return {
    topMenu, // Массив пунктов топ меню
    mainMenu, // Массив пунктов основного меню
    loading, // boolean - идет ли загрузка
    error, // string | null - ошибка загрузки
  };
};

import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { BiUser } from "react-icons/bi";
import { useMenu } from "../../hooks/useMenu";
import logo from "../../assets/logo.webp";
import styles from "./HeadHeader.module.css";

// Определяем интерфейс для пункта меню
interface MenuItemType {
  to: string;
  text: string;
  id: number;
  target?: "_self" | "_blank";
  seoTitle?: string;
  className?: string | null;
  children?: any[];
}

export const HeadHeader: React.FC = () => {
  const { topMenu, loading } = useMenu();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hiddenItems, setHiddenItems] = useState<MenuItemType[]>([]);
  const [visibleItems, setVisibleItems] = useState<MenuItemType[]>([]);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const navRef = useRef<HTMLElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Преобразуем данные из API в нужный формат
  const transformMenuData = (): MenuItemType[] => {
    if (!topMenu || topMenu.length === 0) return [];

    return topMenu
      .filter((item) => item.is_active)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((item) => ({
        to: item.url,
        text: item.title,
        id: item.id,
        target: item.target,
        seoTitle: item.seo_title,
        className: item.class,
        children: item.children,
      }));
  };

  // Fallback меню с правильной типизацией
  const fallbackMenuItems: MenuItemType[] = [
    { to: "/sale/", text: "Акции", id: 1 },
    { to: "/catalog/rasprodazha/", text: "Распродажа", id: 2 },
    { to: "/info/", text: "Покупателям", id: 3 },
    { to: "/contacts/stores/", text: "Магазины", id: 6 },
    { to: "/services/", text: "Мастерская", id: 7 },
    { to: "/company/news/", text: "Новости", id: 8 },
  ];

  // Получаем все пункты меню (из API или fallback)
  const allMenuItems: MenuItemType[] = React.useMemo(() => {
    // Если данные загружены, используем их
    if (topMenu.length > 0) {
      return transformMenuData();
    }

    // Fallback меню если API недоступно или нет данных
    console.log("Using fallback menu data");
    return fallbackMenuItems;
  }, [topMenu]);

  // Закрытие попапа при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        event.target !== moreButtonRef.current
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Закрытие попапа при нажатии Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Обновление позиции попапа при открытии
  useEffect(() => {
    if (isPopupOpen && moreButtonRef.current) {
      const buttonRect = moreButtonRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      setPopupPosition({
        top: buttonRect.bottom + scrollTop,
        left: buttonRect.left + scrollLeft,
      });
    }
  }, [isPopupOpen]);

  // Функция для расчета видимых и скрытых пунктов
  const calculateItems = () => {
    if (!navRef.current || allMenuItems.length === 0) return;

    const nav = navRef.current;
    const navWidth = nav.offsetWidth;

    // Измеряем ширину каждого пункта меню
    const itemWidths = itemRefs.current
      .filter((ref) => ref !== null)
      .map((ref) => (ref ? ref.offsetWidth : 0));

    // Находим логотип для расчета доступной ширины
    const logoElement = nav.querySelector(`.${styles.logoLink}`) as HTMLElement;
    const logoWidth = logoElement ? logoElement.offsetWidth + 25 : 195;

    const moreButtonWidth = 40; // Ширина кнопки "..."
    const gap = 20; // gap между элементами

    // Доступная ширина для пунктов меню
    const screenWidth = document.documentElement.clientWidth;

    let availableWidth =
      screenWidth > 1024
        ? navWidth - logoWidth - moreButtonWidth
        : navWidth - logoWidth - moreButtonWidth - 20;

    // Определяем, сколько пунктов помещается
    let totalWidth = 0;
    const newVisibleItems: MenuItemType[] = [];
    const newHiddenItems: MenuItemType[] = [];

    for (let i = 0; i < allMenuItems.length; i++) {
      const itemWidth = itemWidths[i] || 80;
      const newTotal = totalWidth + itemWidth + (i > 0 ? gap : 0);

      if (newTotal <= availableWidth) {
        newVisibleItems.push(allMenuItems[i]);
        totalWidth = newTotal;
      } else {
        // Добавляем все оставшиеся элементы в скрытые
        for (let j = i; j < allMenuItems.length; j++) {
          newHiddenItems.push(allMenuItems[j]);
        }
        break;
      }
    }

    setVisibleItems(newVisibleItems);
    setHiddenItems(newHiddenItems);
  };

  useEffect(() => {
    // Даем время для рендера элементов перед измерением
    const timer = setTimeout(() => {
      calculateItems();
    }, 100);

    const handleResize = () => {
      calculateItems();
      setIsPopupOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [allMenuItems]);

  // Обновляем ссылки на элементы меню
  const updateItemRef = (index: number, element: HTMLAnchorElement | null) => {
    itemRefs.current[index] = element;
  };

  // Обработчик клика по кнопке "..."
  const handleMoreButtonClick = () => {
    setIsPopupOpen((prev) => !prev);
  };

  // Обработчик клика по пункту в попапе
  const handlePopupItemClick = () => {
    setIsPopupOpen(false);
  };

  // Показываем loading пока меню грузится
  if (loading && allMenuItems.length === 0) {
    return (
      <header className={styles.header}>
        <div className={styles.loadingContainer}>Загрузка меню...</div>
      </header>
    );
  }

  return (
    <div className={styles.headHeader}>
      <div className={`${styles.headHeaderCont} container`}>
        <nav ref={navRef}>
          <NavLink to="/" className={styles.logoLink}>
            <img src={logo} alt="logo" />
          </NavLink>

          {allMenuItems.map((item, index) => {
            if (visibleItems.some((visible) => visible.id === item.id)) {
              return (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  ref={(el) => updateItemRef(index, el)}
                  target={item.target}
                  title={item.seoTitle}
                >
                  {item.text}
                </NavLink>
              );
            }
            return null;
          })}

          {/* Кнопка с тремя точками, если есть скрытые элементы */}
          {hiddenItems.length > 0 && (
            <div className={styles.moreButtonContainer}>
              <button
                ref={moreButtonRef}
                className={`${styles.link} ${styles.moreButton}`}
                onClick={handleMoreButtonClick}
                aria-label="Показать больше пунктов меню"
                aria-expanded={isPopupOpen}
              >
                ...
              </button>
            </div>
          )}
        </nav>

        <div className={styles.numberBlock}>
          <a href="tel:+74958481567">8&nbsp;495&nbsp;848-15-67</a>
          <p>Прием звонков: 09:00-20:00</p>
        </div>

        <div className={styles.buttonsBlock}>
          <button>
            <IconWrapper Icon={BiUser} size={17} style={{ color: "#fff" }} />
            Вход
          </button>
          <button>Регистрация</button>
        </div>
      </div>

      {/* Попап со скрытыми пунктами */}
      {isPopupOpen && hiddenItems.length > 0 && (
        <div
          ref={popupRef}
          className={styles.popup}
          style={{
            position: "absolute",
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          {hiddenItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? `${styles.popupLink} ${styles.popupActive}`
                  : styles.popupLink
              }
              onClick={handlePopupItemClick}
              target={item.target}
              title={item.seoTitle}
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

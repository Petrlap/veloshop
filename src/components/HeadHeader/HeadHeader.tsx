import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { BiUser } from "react-icons/bi";
import logo from "../../assets/logo.webp";
import styles from "./HeadHeader.module.css";

export const HeadHeader: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hiddenItems, setHiddenItems] = useState<
    Array<{ to: string; text: string }>
  >([]);
  const [visibleItems, setVisibleItems] = useState<
    Array<{ to: string; text: string }>
  >([]);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const navRef = useRef<HTMLElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const allMenuItems = [
    { to: "/stock", text: "Акции" },
    { to: "/sale", text: "Распродажа" },
    { to: "/forbuyers", text: "Покупателям" },
    { to: "/payment", text: "Оплата" },
    { to: "/delivery", text: "Доставка" },
    { to: "/stores", text: "Магазины" },
    { to: "/workshop", text: "Мастерская" },
    { to: "/news", text: "Новости" },
  ];

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
    if (!navRef.current) return;

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
    const newVisibleItems = [];
    const newHiddenItems = [];

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
  }, []);

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

  return (
    <div className={styles.headHeader}>
      <div className={`${styles.headHeaderCont} container`}>
        <nav ref={navRef}>
          <NavLink to="/" className={styles.logoLink}>
            <img src={logo} alt="logo" />
          </NavLink>

          {allMenuItems.map((item, index) => {
            if (visibleItems.some((visible) => visible.to === item.to)) {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  ref={(el) => updateItemRef(index, el)}
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

      {/* Попап со скрытыми пунктами (рендерится на уровне всего хедера) */}
      {isPopupOpen && hiddenItems.length > 0 && (
        <div
          ref={popupRef}
          className={styles.popup}
          style={{
            position: "absolute",
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            transform: "translateX(-50%)",
          }}
        >
          {hiddenItems.map(({ to, text }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? `${styles.popupLink} ${styles.popupActive}`
                  : styles.popupLink
              }
              onClick={handlePopupItemClick}
            >
              {text}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

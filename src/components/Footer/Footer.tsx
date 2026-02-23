import { useEffect, useRef } from "react";
import styles from "./Footer.module.css";
import mastercard from "../../assets/payments/mastercard.webp";
import visa from "../../assets/payments/visa.webp";
import mir from "../../assets/payments/mir.webp";
import spasibo from "../../assets/payments/spasibo.webp";
import pokupay from "../../assets/payments/pokupay.webp";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { IoLogoVk } from "react-icons/io";
import { FaOdnoklassniki } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMenu } from "../../hooks/useMenu";

// Маппинг названий меню для футера
const MENU_TITLES: Record<string, string> = {
  "Нижнее меню Каталог": "Каталог",
  "Нижнее меню Информация": "Информация",
  "Нижнее меню Компания": "Компания",
  "Нижнее меню Помощь": "Помощь",
};

export const Footer: React.FC = () => {
  const { footerMenus, loading } = useMenu();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !document.querySelector(
        'script[src="https://app.reviewlab.ru/widget/index-simple.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://app.reviewlab.ru/widget/index-simple.js";
      script.defer = true;
      document.body.appendChild(script);
    }
    if (
      containerRef.current &&
      !containerRef.current.querySelector("review-lab-simple")
    ) {
      const el = document.createElement("review-lab-simple");
      el.setAttribute("data-widgetid", "660546d93d222efcd76396c7");
      containerRef.current.appendChild(el);
    }
  }, []);

  // Функция для рендеринга пункта меню (поддерживает вложенность, если нужно)
  const renderMenuItem = (item: any) => {
    if (item.children && item.children.length > 0) {
      // Если есть дочерние элементы, можно обработать их отдельно
      // Но для футера обычно не нужна вложенность
      return (
        <Link key={item.id} to={item.url}>
          {item.title}
        </Link>
      );
    }

    return (
      <Link key={item.id} to={item.url}>
        {item.title}
      </Link>
    );
  };

  // Если данные загружаются, показываем скелетон или ничего
  if (loading && footerMenus.length === 0) {
    return (
      <footer>
        <div className={styles.footer}>
          <div className="container">
            <div className={styles.loading}>Загрузка меню...</div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer>
      <section className={styles.footer}>
        <div className="container">
          <div className={styles.middleBlock}>
            {/* Рендерим меню из API */}
            {footerMenus.map((menu) => {
              // Фильтруем только активные пункты и сортируем по order
              const activeItems = menu.items
                .filter((item) => item.is_active)
                .sort((a, b) => (a.order || 0) - (b.order || 0));

              if (activeItems.length === 0) return null;

              return (
                <div key={menu.id} className={styles.menuColumn}>
                  <span className={styles.firstLink}>
                    {MENU_TITLES[menu.name] || menu.name}
                  </span>
                  {activeItems.map((item) => renderMenuItem(item))}
                </div>
              );
            })}

            {/* Блок с соцсетями */}
            <div className={styles.rightBlock}>
              <p>Мы в социальных сетях, присоединяйтесь:</p>
              <div className={styles.socialTop}>
                <IconWrapper
                  Icon={IoLogoVk}
                  size={24}
                  style={{
                    color: "#B9B9B9",
                  }}
                />
                <IconWrapper
                  Icon={FaOdnoklassniki}
                  size={24}
                  style={{
                    color: "#B9B9B9",
                  }}
                />
                <IconWrapper
                  Icon={FaYoutube}
                  size={24}
                  style={{
                    color: "#B9B9B9",
                  }}
                />
                <IconWrapper
                  Icon={FaTelegramPlane}
                  size={24}
                  style={{
                    color: "#B9B9B9",
                  }}
                />
              </div>
              <div className={styles.reviews} ref={containerRef}></div>
              <span>Пишите нам</span>
              <div className={styles.socialBottom}>
                <IconWrapper
                  Icon={FaTelegramPlane}
                  size={24}
                  style={{
                    color: "#fff",
                  }}
                />
                <IconWrapper
                  Icon={FaWhatsapp}
                  size={24}
                  style={{
                    color: "#fff",
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.payments}>
            <p>Принимаем к оплате</p>
            <div>
              <img
                src={mastercard}
                style={{ width: "44px", height: "25px" }}
                alt="Master Card"
              />
              <img
                src={visa}
                style={{ width: "44px", height: "25px" }}
                alt="Visa"
              />
              <img
                src={mir}
                style={{ width: "59px", height: "25px" }}
                alt="Mir"
              />
              <img
                style={{ width: "77px", height: "25px" }}
                src={spasibo}
                alt="Spasibo"
              />
              <img
                style={{ width: "100px", height: "25px" }}
                src={pokupay}
                alt="Pokupay"
              />
            </div>
            <p>
              2005 - 2025© Velo-shop.ru Интернет-магазин брендовых велосипедов и
              аксессуаров.
            </p>
          </div>
        </div>
      </section>
      <div className={styles.footerDown}>
        <div className="container">
          <p>
            Cайт ВелоШоп ( www.velo-shop.ru ) носит исключительно информационный
            характер и ни при каких условиях информация, цены и иные материалы
            размещенные на сайте, не являются публичной офертой, определяемой
            положениями Статьи 437 Гражданского кодекса РФ.
          </p>
        </div>
      </div>
    </footer>
  );
};

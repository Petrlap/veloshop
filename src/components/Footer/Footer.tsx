import { useEffect, useRef } from "react";
import styles from "./Footer.module.css";
import mastercard from "../../assets/payments/mastercard.webp";
import visa from "../../assets/payments/visa.webp";
import mir from "../../assets/payments/mir.webp";
import spasibo from "../../assets/payments/spasibo.webp";
import pokupay from "../../assets/payments/pokupay.webp";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { IoLogoVk } from "react-icons/io";
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
                {/* VK */}
                <a
                  href="https://vk.com/velo_shop_new"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWrapper
                    Icon={IoLogoVk}
                    size={24}
                    style={{ color: "#B9B9B9" }}
                  />
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/VeloShopRu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWrapper
                    Icon={FaTelegramPlane}
                    size={24}
                    style={{ color: "#B9B9B9" }}
                  />
                </a>

                {/* Rutube */}
                <a
                  href="https://rutube.ru/channel/67952427/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 192 192"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <path
                      d="M128.689 47.57H20.396v116.843h30.141V126.4h57.756l26.352 38.013h33.75l-29.058-38.188c9.025-1.401 15.522-4.73 19.493-9.985 3.97-5.255 5.956-13.664 5.956-24.875v-8.759c0-6.657-.721-11.912-1.985-15.941-1.264-4.029-3.43-7.533-6.498-10.686-3.249-2.978-6.858-5.08-11.19-6.481-4.332-1.226-9.747-1.927-16.424-1.927zm-4.873 53.08H50.537V73.321h73.279c4.15 0 7.038.7 8.482 1.927 1.444 1.226 2.347 3.503 2.347 6.832v9.81c0 3.503-.903 5.78-2.347 7.006s-4.331 1.752-8.482 1.752z"
                      stroke="#B9B9B9"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="translate(1.605 -1.99)"
                    />
                    <path
                      d="M162.324 45.568c5.52 0 9.998-4.477 9.998-10s-4.478-10-9.998-10c-5.524 0-10.002 4.477-10.002 10s4.478 10 10.002 10z"
                      fill="#B9B9B9"
                      transform="translate(1.605 -1.99)"
                    />
                  </svg>
                </a>
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

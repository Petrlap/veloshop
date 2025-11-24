import { useEffect, useRef } from "react";
import { HeadHeader } from "../HeadHeader/HeadHeader";
import styles from "./Footer.module.css";
import img from "../../assets/bg.webp";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { IoLogoVk } from "react-icons/io";
import { FaOdnoklassniki } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { HeadHeaderMobile } from "../HeadHeaderMobile/HeadHeaderMobile";

export const Footer: React.FC = () => {
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
  return (
    <footer>
      <HeadHeader />
      <HeadHeaderMobile />
      <section className={styles.footer}>
        <div className="container">
          <div className={styles.middleBlock}>
            <div className={styles.menuColumn}>
              <a href="#" className={styles.firstLink}>
                Каталог
              </a>
              <a href="#">Горные велосипеды</a>
              <a href="#">Детские велосипеды</a>
              <a href="#">Городские велосипеды</a>
              <a href="#">Двухподвесные велосипеды</a>
              <a href="#">Женские велосипеды</a>
              <a href="#">Складные велосипеды</a>
              <a href="#">Гоночные велосипеды</a>
              <a href="#">BMX велосипеды</a>
              <a href="#">Самокаты</a>
              <a href="#">Электровелосипеды</a>
            </div>
            <div className={styles.menuColumn}>
              <a href="#" className={styles.firstLink}>
                Информация
              </a>
              <a href="#">Информация</a>
              <a href="#">Условия рассрочки</a>
              <a href="#">Условия доставки</a>
              <a href="#">Возврат / Обмен</a>
              <a href="#">Гарантия на товар</a>
              <a href="#">Расширенная гарантия</a>
              <a href="#">Акции</a>
            </div>
            <div className={styles.menuColumn}>
              <a href="#" className={styles.firstLink}>
                Компания
              </a>
              <a href="#">О компании</a>
              <a href="#">Реквизиты</a>
              <a href="#">Оферта</a>
              <a href="#">Новости</a>
              <a href="#">Вакансии</a>
              <a href="#">Магазины</a>
              <a href="#">Соглашение</a>
              <a href="#">Велосипеды</a>
            </div>
            <div className={styles.menuColumn}>
              <a href="#" className={styles.firstLink}>
                Помощь
              </a>
              <a href="#">Статьи</a>
              <a href="#">Вопрос-ответ</a>
              <a href="#">Производители</a>
              <a href="#">Видео обзоры</a>
              <a href="#">Карта сайта</a>
            </div>
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
                src={img}
                style={{ width: "44px", height: "25px" }}
                alt="Master Card"
              />
              <img
                src={img}
                style={{ width: "44px", height: "25px" }}
                alt="Visa"
              />
              <img
                src={img}
                style={{ width: "59px", height: "25px" }}
                alt="Mir"
              />
              <img
                style={{ width: "77px", height: "25px" }}
                src={img}
                alt="Spasibo"
              />
              <img
                style={{ width: "100px", height: "25px" }}
                src={img}
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

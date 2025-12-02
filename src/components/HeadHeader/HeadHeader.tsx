import { NavLink } from "react-router-dom";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { BiUser } from "react-icons/bi";
import logo from "../../assets/logo.webp";
import styles from "./HeadHeader.module.css";

export const HeadHeader: React.FC = () => {
  return (
    <div className={styles.headHeader}>
      <div className={`${styles.headHeaderCont} container`}>
        <nav>
          <NavLink to="/" className={styles.logoLink}>
            <img src={logo} alt="logo" />
          </NavLink>
          {[
            { to: "/stock", text: "Акции" },
            { to: "/sale", text: "Распродажа" },
            { to: "/forbuyers", text: "Покупателям" },
            { to: "/payment", text: "Оплата" },
            { to: "/delivery", text: "Доставка" },
            { to: "/stores", text: "Магазины" },
            { to: "/workshop", text: "Мастерская" },
            { to: "/news", text: "Новости" },
          ].map(({ to, text }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {text}
            </NavLink>
          ))}
        </nav>
        <div className={styles.numberBlock}>
          <a href="tel:+74958481567">8&nbsp;495&nbsp;848-15-67</a>
          <p>Прием звонков: 09:00-20:00</p>
        </div>
        <div className={styles.buttonsBlock}>
          <button>
            <IconWrapper
              Icon={BiUser}
              size={17}
              style={{
                color: "#fff",
              }}
            />{" "}
            Вход
          </button>
          <button>Регистрация</button>
        </div>
      </div>
    </div>
  );
};

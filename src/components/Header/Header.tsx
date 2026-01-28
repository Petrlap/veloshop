import { HeadHeader } from "../HeadHeader/HeadHeader";
import { TbGridDots } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { RiHeart3Line } from "react-icons/ri";
import { SlBasket } from "react-icons/sl";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { HeadHeaderMobile } from "../HeadHeaderMobile/HeadHeaderMobile";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header>
      <HeadHeader />
      <HeadHeaderMobile />
      <div className={`${styles.headerCont} container`}>
        <div className={styles.contactsBlock}>
          <Link to="/fullcatalog" className={styles.catalog}>
            <IconWrapper
              Icon={TbGridDots}
              size={20}
              style={{
                color: "#fff",
              }}
            />{" "}
            <span>Каталог</span>
          </Link>
          <div className={styles.wrappers}>
            <div className={styles.cityWrapper}>
              <IconWrapper
                Icon={FiMapPin}
                size={20}
                style={{
                  color: "#000",
                }}
              />
              <button>Москва</button>
            </div>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Поиск..."
                className={styles.searchInput}
              />
              <IconWrapper
                Icon={FiSearch}
                className={styles.icon}
                size={20}
                style={{
                  color: "#D2D2D2",
                }}
              />
            </div>
            <div className={styles.socialhWrapper}>
              <span>На связи</span>
              <IconWrapper
                Icon={FaTelegram}
                size={26}
                style={{
                  color: "#1D93D2",
                }}
              />
              <IconWrapper
                Icon={IoLogoWhatsapp}
                size={28}
                style={{
                  color: "#2CB742",
                }}
              />
            </div>
          </div>
          <div className={styles.iconsBox}>
            <div>
              <IconWrapper
                Icon={IoStatsChart}
                size={24}
                style={{
                  color: "#000",
                }}
              />
              <span>300</span>
            </div>
            <div>
              <IconWrapper
                Icon={RiHeart3Line}
                size={24}
                style={{
                  color: "#000",
                }}
              />
              <span>300</span>
            </div>
            <div>
              <IconWrapper
                Icon={SlBasket}
                size={24}
                style={{
                  color: "#000",
                }}
              />
              <span>300</span>
            </div>
          </div>
        </div>
        <nav className={styles.catalogNav}>
          <a href="/">Велосипеды</a>
          <a href="/">Самокаты</a>
          <a href="/">Запчасти</a>
          <a href="/">Аксессуары</a>
          <a href="/">Обслуживание</a>
          <a href="/">Велоодежда</a>
        </nav>
      </div>
    </header>
  );
};

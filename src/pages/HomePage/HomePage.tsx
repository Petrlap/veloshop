import { useState } from "react";
import styles from "./HomePage.module.css";
import { Card } from "../../components/Card/Card";
import img1 from "../../assets/bg.webp";
import img2 from "../../assets/bg.webp";
import img3 from "../../assets/bg.webp";
import img4 from "../../assets/bg.webp";
import img5 from "../../assets/bg.webp";
import img6 from "../../assets/bg.webp";
import { ImportantInformation } from "../../components/ImportantInformation/ImportantInformation";
import { OurStores } from "../../components/OurStores/OurStores";
import { Rutube } from "../../components/Rutube/Rutube";
import { Warehouse } from "../../components/Warehouse/Warehouse";
import { BuyCorrectly } from "../../components/BuyCorrectly/BuyCorrectly";
import { WarehouseText } from "../../components/WarehouseText/WarehouseText";
import { CatalogHomepage } from "../../components/CatalogHomepage/CatalogHomepage";
import { Sales } from "../../components/Sales/Sales";
import { Quiz } from "../../components/Quiz/Quiz";
import { BannerBlock } from "../../components/BannerBlock/BannerBlock";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";
import { Brands } from "../../components/Brands/Brands";
import { MiniFilter } from "../../components/MiniFilter/MiniFilter";
import { BigFilter } from "../../components/BigFilter/BigFilter";

export const HomePage: React.FC = () => {
  const hits = [
    {
      image: img1,
      hit: true,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img2,
      hit: true,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img3,
      hit: false,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img4,
      hit: false,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img5,
      hit: false,
      sale: true,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "82 100",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img6,
      hit: false,
      sale: true,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "42 100",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
  ];
  const news = [
    {
      image: img1,
      hit: true,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img2,
      hit: true,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img3,
      hit: false,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img4,
      hit: false,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img5,
      hit: false,
      sale: true,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "82 100",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img6,
      hit: false,
      sale: true,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "42 100",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
  ];
  const sales = [
    {
      image: img1,
      hit: true,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img2,
      hit: true,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img3,
      hit: false,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img4,
      hit: false,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img5,
      hit: false,
      sale: true,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "82 100",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img6,
      hit: false,
      sale: true,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "42 100",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <BannerBlock />
      <Brands />
      <section className={styles.filter}>
        <div className={styles.cardsHead}>
          <h2>Подберите лучший велосипед!</h2>

          <button onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? "Скрыть фильтр" : "Расширенный поиск"}{" "}
            <IconWrapper
              Icon={
                isOpen ? MdOutlineKeyboardArrowUp : MdOutlineKeyboardArrowDown
              }
              size={20}
              style={{ color: "#1D93D2" }}
            />
          </button>
        </div>

        {isOpen ? <BigFilter /> : <MiniFilter />}
      </section>

      <CatalogHomepage />
      <section className={styles.cardsLineCont}>
        <div className={styles.cardsHead}>
          <h2>
            <span>Хиты</span> продаж
          </h2>
          <div></div>
          <a href="#">Смотреть все предложения {">"}</a>
        </div>
        <div className={styles.cardsLine}>
          {hits.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
        <a href="#">Смотреть все предложения {">"}</a>
      </section>
      <section className={styles.cardsLineCont}>
        <div className={styles.cardsHead}>
          <h2>
            <span>Новинки</span> 2025
          </h2>
          <div></div>
          <a href="#">Смотреть все предложения {">"}</a>
        </div>
        <div className={styles.cardsLine}>
          {news.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
        <a href="#">Смотреть все предложения {">"}</a>
      </section>
      <section className={styles.cardsLineCont}>
        <div className={styles.cardsHead}>
          <h2>
            <span>Распродажа</span> месяца
          </h2>
          <div></div>
          <a href="#">Смотреть все предложения {">"}</a>
        </div>
        <div className={styles.cardsLine}>
          {sales.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
        <a href="#">Смотреть все предложения {">"}</a>
      </section>
      <BuyCorrectly />
      <WarehouseText />
      <Quiz />
      <Sales />
      <Warehouse />
      <Rutube />
      <ImportantInformation />
      <OurStores />
    </>
  );
};

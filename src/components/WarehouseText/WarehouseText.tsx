import React from "react";
import styles from "./WarehouseText.module.css";
import img from "../../assets/bg.webp";

export const WarehouseText: React.FC = () => {
  return (
    <section className={styles.buyCorrectly}>
      <h2>
        <span>КРУПНЕЙШИЙ СКЛАД</span> МАГАЗИНА ВЕЛОСИПЕДОВ «ВЕЛОШОП»
      </h2>
      <div className={styles.correctly}>
        <div className={styles.correctlyBox}>
          <ul>
            <li>
              Бесплатная доставка для жителей Москвы, Московской области,
              Санкт-Петербурга , Ленобласти и Пскова.
            </li>
            <li>Отправка в регионы транспортными компаниями-партнерами.</li>
            <li>Гарантия на велосипеды.</li>
            <li>Мастерская и сервисный ремонт.</li>
            <li>Большой выбор товаров для велоспорта.</li>
            <li>
              Распродажа. Мы предлагаем выгодные цены на популярные модели
              прошлых лет на странице <a href="#">«Распродажа»</a>.
            </li>
            <li>Удобные способы оплаты покупки.</li>
            <li>Пополнение ассортимента новыми моделями.</li>
          </ul>
        </div>
        <div className={styles.correctlyBox}>
          <p className={styles.rightText}>
            Для тех, кто не хочет терять драгоценное время на изучение
            материалов, есть выход: либо воспользоваться профессиональной
            помощью по телефону в Москве<br></br>
            <a href="tel:+74956461567">8 (495) 646-15-67</a>, либо приехать к
            нам в веломагазин и пообщаться с консультантами вживую.
          </p>
          <p className={styles.rightText}>
            Мы уверены, что в таком крупном интернет-магазине, как «ВелоШоп», вы
            обязательно купите велосипед по выгодной цене на долгие годы.
          </p>
          <div className={styles.linksBlock}>
            <button>Подробно {">"}</button>
            <a href="tel:+74956461567">8 (495) 646-15-67</a>
            <img src={img} alt="Logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

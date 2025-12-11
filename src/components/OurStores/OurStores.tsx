import React from "react";
import styles from "./OurStores.module.css";
import { IoMapOutline } from "react-icons/io5";
import { IconWrapper } from "../IconWrapper/IconWrapper";

export const OurStores: React.FC = () => {
  return (
    <section className={styles.ourStores}>
      <h2>Наши магазины</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <p className={styles.title}>Склад-магазин в Ленино</p>
          <div className={styles.addressBox}>
            <span>Адрес:</span>
            <p>
              МО, Истринский район, д.<br></br>
              Ленино, Живописная 186-188
            </p>
          </div>
          <div className={styles.phonesBox}>
            <span>Телефон:</span>
            <a href="tel:+78005551704">8 800 555-17-04;</a>
            <br></br>
            <a href="tel:+74956461567">8 495 646-15-67</a>
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>ПВЗ Санкт-Петербург</p>
          <div className={styles.addressBox}>
            <span>Адрес:</span>
            <p>Волхонское шоссе 6</p>
          </div>
          <div className={styles.phonesBox}>
            <span>Телефон:</span>
            <a href="tel:+78129881707">8 812 988-17-07</a>
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>ПВЗ Барнаул</p>
          <div className={styles.addressBox}>
            <span>Адрес:</span>
            <p>
              Барнаул, Власихинская,<br></br>
              131
            </p>
          </div>
          <div className={styles.phonesBox}>
            <span>Телефон:</span>
            <a href="tel:+78005551704">8 800 555-17-04</a>
          </div>
        </div>
        <div className={`${styles.card} ${styles.blackCard}`}>
          <div className={styles.svgCont}>
            <IconWrapper
              Icon={IoMapOutline}
              size={20}
              style={{
                color: "#F34723",
              }}
            />
          </div>
          <p>
            Посмотреть<br></br>все магазины на карте
          </p>
          <button>Проложить маршрут {">"}</button>
        </div>
      </div>
    </section>
  );
};

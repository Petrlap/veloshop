import React, { useState } from "react";
import styles from "./DetailTabs.module.css";
import imgMini from "../../assets/mini.webp";
import { MiniCard } from "../MiniCard/MiniCard";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { IconWrapper } from "../IconWrapper/IconWrapper";

export const DetailTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"desc" | "stock" | "delivery">(
    "desc"
  );
  const minicard = [
    {
      image: imgMini,
      year: "2024",
      sale: "23%",
      title: "Женский велосипед Welt Edelweiss 2.0 HD27...",
    },
  ];
  return (
    <section className={styles.detailTabs}>
      <div className={styles.informationBlock}>
        <div className={styles.wrapper}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "desc" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("desc")}
            >
              Описание
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "stock" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("stock")}
            >
              Наличие на складе
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "delivery" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("delivery")}
            >
              Доставка
            </button>
          </div>

          <div className={styles.content}>
            {activeTab === "desc" && (
              <p>
                Велосипед Welt Edelweiss — модель с продуманной конструкцией
                рамы. Отлично держит дорогу как при движении по прямой, так и
                при совершении маневров. Дисковые гидравлические тормоза
                повышенной надёжности и колеса 27.5" (650B) дюймов являются
                залогом не только безопасного, но и комфортного движения по
                любому рельефу. Дополняют картину лёгкий разгон и отличные
                скоростные характеристики. Горные велосипеды с колёсами 27,5
                (новый стандарт), помимо отличных технических характеристик,
                имеют стильный дизайн, что очень важно для любого современного
                райдера. Модель Без года года выглядит оригинально и стильно.
                Она может быть отправлена в любую точку России.
              </p>
            )}

            {activeTab === "stock" && (
              <p>Товар в наличии на складе. Возможна отгрузка в день заказа.</p>
            )}

            {activeTab === "delivery" && (
              <p>Доставка по всей России. Курьером или в пункт выдачи.</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.miniCard}>
        {minicard.map((item, index) => (
          <MiniCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

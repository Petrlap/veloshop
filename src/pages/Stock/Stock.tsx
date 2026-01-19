import React, { useState } from "react";
import { ConsultationForm } from "../../components/ConsultationForm/ConsultationForm";
import { MiniConsultatinForm } from "../../components/MiniConsultatinForm/MiniConsultatinForm";
import styles from "./Stock.module.css";

import sale_1 from "../../assets/sale/sale-1.webp";
import sale_2 from "../../assets/sale/sale-2.webp";
import sale_3 from "../../assets/sale/sale-3.webp";

type StockItem = {
  id: number;
  image: string;
  title: string;
  description?: string;
};

const stock: StockItem[] = [
  {
    id: 1,
    image: sale_1,
    title: "Велосипеды Stark со скидкой 40%",
    description:
      "Только сейчас, скидки на велосипеды бренда Stark со скидкой до 40%.",
  },
  {
    id: 2,
    image: sale_2,
    title: "Скидка на День рождения!",
    description: "Дарим 2000 рублей скидки на покупку велосипеда.",
  },
  {
    id: 3,
    image: sale_3,
    title: "Скидка по карте Москвича",
  },
  {
    id: 4,
    image: sale_1,
    title: "Сезонная распродажа",
    description: "Скидки на аксессуары и экипировку до 30%.",
  },
  {
    id: 5,
    image: sale_2,
    title: "Trade-in велосипеда",
    description: "Обмени старый велосипед на новый с выгодой.",
  },
];

export const Stock: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const visibleSales = showAll ? stock : stock.slice(0, 3);

  return (
    <>
      <section className={styles.stock}>
        <div>
          <span className={styles.breadcrubs}>главная / акции</span>
          <h1>Акции</h1>
          <p>
            Акции и спецпредложения действуют во всех наших магазинах – вы
            всегда можете найти в них широкий выбор товаров по выгодным ценам.
            Мы предлагаем вам привлекательные скидки на новинки и уже
            полюбившиеся продукты. Товары, на которые распространяются акции,
            указаны в разделе описания акций, в магазинах они отмечены
            специальными ценниками или знаком акции.
            <br />
            <br />
            Удачных покупок!
          </p>
          <div className={styles.mobile}>
            <MiniConsultatinForm />
          </div>
          <div className={styles.stockBox}>
            {visibleSales.map((stock) => (
              <div key={stock.id} className={styles.stockItem}>
                <img src={stock.image} alt={stock.title} />
                <div>
                  <p className={styles.title}>{stock.title}</p>
                  {stock.description && (
                    <p className={styles.description}>{stock.description}</p>
                  )}
                  <button>Подробнее</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.desk}>
          <MiniConsultatinForm />
          <MiniConsultatinForm />
        </div>
      </section>
      {!showAll && stock.length > 3 && (
        <button className={styles.moreBtn} onClick={() => setShowAll(true)}>
          Все акции
        </button>
      )}
      <ConsultationForm />
    </>
  );
};

import React from "react";
import styles from "./Tracker.module.css";
import imgMini from "../../assets/mini.webp";
import { MiniCard } from "../MiniCard/MiniCard";
import before from "../../assets/before.webp";
import after from "../../assets/after.webp";

export const Tracker: React.FC = () => {
  const minicard = [
    {
      image: imgMini,
      year: "2024",
      sale: "23%",
      title: "Женский велосипед Welt Edelweiss 2.0 HD27...",
    },
  ];
  return (
    <section className={styles.tracker}>
      <div className={styles.whiteBlock}>
        <div className={styles.bottomBlock}>
          <p className={styles.title}>Быстрая отправка и онлайн-отслеживание</p>
          <p>
            Срок сборки: <span>1-2 рабочих дня</span> (в зависимости от
            загруженности склада).
          </p>
          <p>
            Отслеживайте статус заказа в личном кабинете и получайте уведомления
            о передаче в службу доставки.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <div>
            <img src={before} alt="" />
            <p>до</p>
          </div>
          <div>
            <img src={after} alt="" />
            <p>после</p>
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

import React from "react";
import styles from "./MiniCard.module.css";

interface MiniCardProps {
  image: string;
  year: string;
  sale: string;
  title: string;
}

export const MiniCard: React.FC<MiniCardProps> = ({
  image,
  year,
  sale,
  title,
}) => {
  return (
    <div className={styles.minicard}>
      <div className={styles.headBlock}>
        <img src={image} alt="" />
        <div>
          <p className={styles.year}>{year}</p>
          <p className={styles.sale}>{sale}</p>
        </div>
      </div>
      <p>{title}</p>
      <div className={styles.buttonBlock}>
        <p>
          Оформите сейчас <span>пока скидка {sale}</span>
        </p>
        <button>Купить</button>
      </div>
    </div>
  );
};

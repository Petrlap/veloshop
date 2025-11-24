import React from "react";
import styles from "./Card.module.css";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { SlBasket } from "react-icons/sl";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface CardProps {
  image: string;
  hit: boolean;
  sale: boolean;
  section: string;
  status: string;
  title: string;
  price: string;
  oldprice: string;
  pricePerMonth: string;
}

export const Card: React.FC<CardProps> = ({
  image,
  hit,
  sale,
  section,
  status,
  title,
  price,
  oldprice,
  pricePerMonth,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageBlock}>
        {hit && <div className={styles.hitLabel}>Hit</div>}
        {sale && <div className={styles.saleLabel}>Sale</div>}
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.statuses}>
        <div className={styles.section}>{section}</div>
        <div className={styles.status}>
          <IconWrapper
            Icon={IoMdCheckmark}
            size={12}
            style={{
              color: "#2CB742",
            }}
          />{" "}
          {status}
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={oldprice ? styles.oldPriceLine : ""}>
        {oldprice && (
          <span className={styles.oldPrice}>
            {oldprice}
            {"₽"}
          </span>
        )}
        <div className={styles.price}>
          <span>{price}</span>
          {"₽/шт"}
        </div>
        {oldprice &&
          (() => {
            const oldNum = Number(oldprice.replace(/\s/g, ""));
            const newNum = Number(price.replace(/\s/g, ""));
            const discount = Math.round(((oldNum - newNum) / oldNum) * 100);

            return <span className={styles.discount}>-{discount}%</span>;
          })()}
      </div>
      <div className={styles.pricePerMonth}>
        {pricePerMonth}{" "}
        <IconWrapper
          Icon={AiOutlineQuestionCircle}
          size={15}
          style={{
            color: "#939393",
          }}
        />
      </div>
      <button>
        + Добавить{" "}
        <IconWrapper
          Icon={SlBasket}
          size={20}
          style={{
            color: "#F34723",
          }}
        />
      </button>
    </div>
  );
};

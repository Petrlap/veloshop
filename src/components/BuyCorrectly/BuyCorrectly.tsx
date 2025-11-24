import React from "react";
import styles from "./BuyCorrectly.module.css";

export const BuyCorrectly: React.FC = () => {
  return (
    <section className={styles.buyCorrectly}>
      <h2>
        Покупайте велосипед <span>правильно</span>
      </h2>
      <div className={styles.correctly}>
        <div className={styles.correctlyBox}>
          <h3>Шаг 1</h3>
          <p>
            У нас легко купить велосипед, подходящий именно вам. Задайте себе
            несколько вопросов. По какой местности вы чаще всего собираетесь
            передвигаться, какова будет интенсивность? Это поможет заказать
            наиболее подходящий тип велосипеда.
          </p>
          <span style={{ lineHeight: "300%" }}>Например:</span>
          <ul>
            <li>пересеченная местность - горные; и двухподвесы;</li>
            <li>город — городские, круизеры и спортивные складные;</li>
            <li>детские — для детей от 1,5 до 9 лет;</li>
            <li>подростковые и BMX — для подростков от 7 до 15 лет;</li>
            <li>женские — для девушек и женщин.</li>
          </ul>
        </div>
        <div className={styles.correctlyBox}>
          <h3>Шаг 2</h3>
          <p>
            После этого советуем поближе познакомиться с брендами велосипедов,
            имеющихся в продаже, и их историей.
          </p>
          <p>
            На данном этапе у вас есть вся необходимая информация, вы готовы
            сделать <a href="#">заказ онлайн</a>
          </p>
          <div className={styles.linksBlock}>
            <button>Выбрать велосипед</button>
            <a href="#">Подобрать аксессуары {">"}</a>
          </div>
          <span>Не забудьте про необходимые аксессуары*</span>
        </div>
      </div>
    </section>
  );
};

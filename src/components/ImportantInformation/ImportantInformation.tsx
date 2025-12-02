import React from "react";
import styles from "./ImportantInformation.module.css";
import img1 from "../../assets/importantinformation/preview-1.webp";
import img2 from "../../assets/importantinformation/preview-2.webp";
import img3 from "../../assets/importantinformation/preview-3.webp";
import img4 from "../../assets/importantinformation/preview-4.webp";
import img5 from "../../assets/importantinformation/persone-1.webp";
import img6 from "../../assets/importantinformation/persone-2.webp";
import img7 from "../../assets/importantinformation/persone-3.webp";
import img8 from "../../assets/importantinformation/persone-4.webp";

const news = [
  {
    image: img1,
    persone: img5,
    date: "12 марта",
    title: "Краткий заголовок",
    description: "Краткий под заголовок возможно в две строки даже",
    name: "Григорий Григоревич",
    position: "CEO & Founder",
  },
  {
    image: img2,
    persone: img6,
    date: "12 марта",
    title: "Краткий заголовок",
    description: "Краткий под заголовок возможно в две строки даже",
    name: "Григорий Григоревич",
    position: "CEO & Founder",
  },
  {
    image: img3,
    persone: img7,
    date: "12 марта",
    title: "Краткий заголовок",
    description: "Краткий под заголовок возможно в две строки даже",
    name: "Григорий Григоревич",
    position: "CEO & Founder",
  },
  {
    image: img4,
    persone: img8,
    date: "12 марта",
    title: "Краткий заголовок",
    description: "Краткий под заголовок возможно в две строки даже",
    name: "Григорий Григоревич",
    position: "CEO & Founder",
  },
];

export const ImportantInformation: React.FC = () => {
  return (
    <section className={styles.importantInformation}>
      <div className={styles.cardsHead}>
        <h2>Важная информация</h2>
        <a href="#">Все статьи {">"}</a>
      </div>
      <div className={styles.cardsWrapper}>
        {news.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.cardContent}>
              <span className={styles.date}>{item.date}</span>
              <a href="#" className={styles.title}>
                {item.title}
              </a>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.author}>
                <img
                  src={item.persone}
                  alt={item.name}
                  className={styles.personImg}
                />
                <div>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.position}>{item.position}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <a href="#">Все статьи {">"}</a>
    </section>
  );
};

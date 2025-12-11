import React, { useState, useEffect } from "react";
import styles from "./CatalogHomepage.module.css";
import { IoIosArrowDropright } from "react-icons/io";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import img1 from "../../assets/catalog/img-1.webp";
import img2 from "../../assets/catalog/img-2.webp";
import img3 from "../../assets/catalog/img-3.webp";
import img4 from "../../assets/catalog/img-4.webp";
import img21 from "../../assets/catalog/img2-1.webp";
import img22 from "../../assets/catalog/img2-2.webp";
import img23 from "../../assets/catalog/img2-3.webp";
import img24 from "../../assets/catalog/img2-4.webp";

const catalogData = [
  {
    tab: "Велосипеды",
    cards: [
      {
        title: "Горные велосипеды",
        img: img21,
        items: [
          "Рыбатекст",
          "используется",
          "дизайнерами,",
          "проектировщиками",
          "фронтендерами",
        ],
      },
      {
        title: "Женские велосипеды",
        img: img22,
        items: [
          "Рыбатекст",
          "используется",
          "дизайнерами,",
          "проектировщиками",
          "фронтендерами",
        ],
      },
      {
        title: "Детские велосипеды",
        img: img23,
        items: [
          "Рыбатекст",
          "используется",
          "дизайнерами,",
          "проектировщиками",
          "фронтендерами",
        ],
      },
      {
        title: "Для подростков",
        img: img24,
        items: [
          "Рыбатекст",
          "используется",
          "дизайнерами,",
          "проектировщиками",
          "фронтендерами",
        ],
      },
    ],
  },
  {
    tab: "Самокаты",
    cards: [
      {
        title: "Городские самокаты",
        img: img21,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Трюковые самокаты",
        img: img22,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Электросамокаты",
        img: img23,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Аксессуары",
        img: img24,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
    ],
  },
  {
    tab: "Велоаксессуары",
    cards: [
      {
        title: "Шлемы",
        img: img21,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Фонари",
        img: img22,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Замки",
        img: img23,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Перчатки",
        img: img24,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
    ],
  },
  {
    tab: "Запчасти",
    cards: [
      {
        title: "Трансмиссия",
        img: img21,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Тормоза",
        img: img22,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Колеса",
        img: img23,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Подвеска",
        img: img24,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
    ],
  },
  {
    tab: "Экипировка",
    cards: [
      {
        title: "Одежда",
        img: img21,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Обувь",
        img: img22,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Перчатки",
        img: img23,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Очки",
        img: img24,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
    ],
  },
  {
    tab: "Инструменты",
    cards: [
      {
        title: "Мультитулы",
        img: img21,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Наборы ключей",
        img: img22,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Насосы",
        img: img23,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Ремкомплекты",
        img: img24,
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
    ],
  },
];

export const CatalogHomepage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || catalogData[0].tab
  );

  const currentCards =
    catalogData.find((tab) => tab.tab === activeTab)?.cards || [];

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <section className={styles.catalogHP}>
      <div className={styles.catalogTabs}>
        {catalogData.map((tab) => (
          <button
            key={tab.tab}
            onClick={() => setActiveTab(tab.tab)}
            className={activeTab === tab.tab ? styles.activeTab : ""}
          >
            {tab.tab}
          </button>
        ))}
      </div>

      <div className={styles.whiteCards}>
        {currentCards.map((card, index) => (
          <div className={styles.cardW} key={index}>
            <div>
              <img src={card.img} alt="" />
              <p>{card.title}</p>
              <ul>
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <button>
              Смотреть весь каталог
              <IconWrapper
                Icon={IoIosArrowDropright}
                size={24}
                style={{ color: "#2E303B" }}
              />
            </button>
          </div>
        ))}
      </div>
      <div className={styles.blackCards}>
        <div className={styles.cardB}>
          <div>
            <img src={img1} alt="" />
            <p>Городские велосипеды</p>
            <ul>
              <li>Рыбатекст</li>
              <li>используется</li>
              <li>дизайнерами,</li>
              <li>проектировщиками</li>
              <li>фронтендерами</li>
            </ul>
          </div>
          <button>
            Смотреть весь каталог
            <IconWrapper
              Icon={IoIosArrowDropright}
              size={24}
              style={{
                color: "#fff",
              }}
            />
          </button>
        </div>
        <div className={styles.cardB}>
          <div>
            <img src={img2} alt="" />
            <p>
              Электро-<br></br>велосипеды
            </p>
            <ul>
              <li>Рыбатекст</li>
              <li>используется</li>
              <li>дизайнерами,</li>
              <li>проектировщиками</li>
              <li>фронтендерами</li>
            </ul>
          </div>
          <button>
            Смотреть весь каталог
            <IconWrapper
              Icon={IoIosArrowDropright}
              size={24}
              style={{
                color: "#fff",
              }}
            />
          </button>
        </div>
        <div className={styles.cardB}>
          <div>
            <img src={img3} alt="" />
            <p>
              Мужские<br></br>велосипеды
            </p>
            <ul>
              <li>Рыбатекст</li>
              <li>используется</li>
              <li>дизайнерами,</li>
              <li>проектировщиками</li>
              <li>фронтендерами</li>
            </ul>
          </div>
          <button>
            Смотреть весь каталог
            <IconWrapper
              Icon={IoIosArrowDropright}
              size={24}
              style={{
                color: "#fff",
              }}
            />
          </button>
        </div>
        <div className={styles.cardB}>
          <div>
            <img src={img4} alt="" />
            <p>
              VIP<br></br>велосипеды
            </p>
            <ul>
              <li>Рыбатекст</li>
              <li>используется</li>
              <li>дизайнерами,</li>
              <li>проектировщиками</li>
              <li>фронтендерами</li>
            </ul>
          </div>
          <button>
            Смотреть весь каталог
            <IconWrapper
              Icon={IoIosArrowDropright}
              size={24}
              style={{
                color: "#fff",
              }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

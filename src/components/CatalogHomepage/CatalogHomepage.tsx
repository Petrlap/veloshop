import React, { useState, useEffect } from "react";
import styles from "./CatalogHomepage.module.css";
import { IoIosArrowDropright } from "react-icons/io";
import { IconWrapper } from "../IconWrapper/IconWrapper";

const catalogData = [
  {
    tab: "Велосипеды",
    cards: [
      {
        title: "Горные велосипеды",
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
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Трюковые самокаты",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Электросамокаты",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Аксессуары",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
    ],
  },
  {
    tab: "Велоаксессуары",
    cards: [
      {
        title: "Шлемы",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Фонари",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Замки",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Перчатки",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
    ],
  },
  {
    tab: "Запчасти",
    cards: [
      {
        title: "Трансмиссия",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Тормоза",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Колеса",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Подвеска",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
    ],
  },
  {
    tab: "Экипировка",
    cards: [
      {
        title: "Одежда",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Обувь",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Перчатки",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Очки",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
    ],
  },
  {
    tab: "Инструменты",
    cards: [
      {
        title: "Мультитулы",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Наборы ключей",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Насосы",
        items: ["Пример 1", "Пример 2", "Пример 3", "Пример 4"],
      },
      {
        title: "Ремкомплекты",
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

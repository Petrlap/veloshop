import React, { useState, useEffect } from "react";
import styles from "./Catalog.module.css";
import { IoIosArrowDropright } from "react-icons/io";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";

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

export const Catalog: React.FC = () => {
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || catalogData[0].tab
  );

  const currentCards =
    catalogData.find((tab) => tab.tab === activeTab)?.cards || [];

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <>
      <p className={styles.breadCrumbs}>главная / каталог</p>
      <h1 className={styles.h1}>Каталог</h1>
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
              <p>ФЭТБАЙКИ</p>
              <ul>
                <li>Ригиды</li>
                <li>Двухподвесы</li>
                <li>Складные</li>
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
                СКАЛАДНЫЕ<br></br>велосипеды
              </p>
              <ul>
                <li>Горные складные</li>
                <li>Городские складные</li>
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
              <p>Двухподвесы</p>
              <ul>
                <li>Колеса 26 (стандарт)</li>
                <li>Колеса 27,5 (новый стандарт)</li>
                <li>Колеса 29 (найнеры)</li>
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
              <p>Шоссейные</p>
              <ul>
                <li>Гоночные</li>
                <li>Трековые</li>
                <li>Триатлон/ТТ</li>
                <li>Фикс и Синглспид</li>
                <li>Циклокросс</li>
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
        <div className={styles.whiteCards}>
          <div className={styles.cardW}>
            <div>
              <p>Гравийные</p>
              <ul>
                <li>Прямой руль</li>
                <li>Руль-баран</li>
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
          <div className={styles.cardW}>
            <div>
              <p>Стрит/ дерт</p>
              <ul>
                <li>Велосипеды для стрита</li>
                <li>Велосипеды для дерта</li>
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
          <div className={styles.cardW}>
            <div>
              <p>Bmx</p>
              <ul>
                <li>Классический BMX (20”)</li>
                <li>Дерт/стрит (24”, 26”)</li>
                <li>Флэтленд BMX</li>
                <li>Гоночный BMX</li>
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
          <div className={styles.cardW}>
            <div>
              <p>Распродажа</p>
              <div style={{ display: "flex" }}>
                <ul>
                  <li>Городские </li>
                  <li>Фэтбайки</li>
                  <li>Складные</li>
                  <li>Двухподвесы</li>
                </ul>
                <ul>
                  <li>Шоссейные</li>
                  <li>Гравийные</li>
                  <li>Стрит/дерт</li>
                  <li>Bmx</li>
                </ul>
              </div>
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
        </div>
      </section>
    </>
  );
};

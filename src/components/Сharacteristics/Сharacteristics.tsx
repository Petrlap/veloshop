import React from "react";
import styles from "./Сharacteristics.module.css";
import imgMini from "../../assets/mini.webp";
import { MiniCard } from "../MiniCard/MiniCard";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";

export const Сharacteristics: React.FC = () => {
  const minicard = [
    {
      image: imgMini,
      year: "2024",
      sale: "23%",
      title: "Женский велосипед Welt Edelweiss 2.0 HD27...",
    },
  ];
  return (
    <section className={styles.characteristics}>
      <div className={styles.informationBlock}>
        <div className={styles.characteristicsBlock}>
          <h2>Характеристики</h2>
          <div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Бренд</p>
              <span></span>
              <p className={styles.value}>STELS</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Модель</p>
              <span></span>
              <p className={styles.value}>Navigator 750 D</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Год</p>
              <span></span>
              <p className={styles.value}>Без года</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Серия</p>
              <span></span>
              <p className={styles.value}>Navigator</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Материал рамы</p>
              <span></span>
              <p className={styles.value}>Алюминий (Alloy)</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Тип вилки</p>
              <span></span>
              <p className={styles.value}>Амортизационная (пружина)</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Блокировка амортизатора</p>
              <span></span>
              <p className={styles.value}>Нет</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Диаметр колес</p>
              <span></span>
              <p className={styles.value}>27.5" (650B)</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Тормоза</p>
              <span></span>
              <p className={styles.value}>Дисковые гидравлические</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Уровень оборудования</p>
              <span></span>
              <p className={styles.value}>Любительский</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Количество скоростей</p>
              <span></span>
              <p className={styles.value}>24</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Пол/возраст</p>
              <span></span>
              <p className={styles.value}>Мужской</p>
            </div>
            <div className={styles.characteristicsItem}>
              <p className={styles.name}>Артикул</p>
              <span></span>
              <p className={styles.value}>LU085103</p>
            </div>
          </div>
        </div>
        <div className={styles.documentsBlock}>
          <h2>Документы</h2>
          <div className={styles.documentsList}>
            <div>
              <IconWrapper
                Icon={HiOutlineDocumentArrowDown}
                size={24}
                style={{ color: "#F34723" }}
              />
              <div>
                <p>Сертификат STELS.pdf</p>
                <p className={styles.pretitle}>Размер: 3,3 Mb</p>
              </div>
            </div>
            <div>
              <IconWrapper
                Icon={HiOutlineDocumentArrowDown}
                size={24}
                style={{ color: "#F34723" }}
              />
              <div>
                <p>Сертификат STELS.pdf</p>
                <p className={styles.pretitle}>Размер: 3,3 Mb</p>
              </div>
            </div>
            <div>
              <IconWrapper
                Icon={HiOutlineDocumentArrowDown}
                size={24}
                style={{ color: "#F34723" }}
              />
              <div>
                <p>Сертификат STELS.pdf</p>
                <p className={styles.pretitle}>Размер: 3,3 Mb</p>
              </div>
            </div>
            <div>
              <IconWrapper
                Icon={HiOutlineDocumentArrowDown}
                size={24}
                style={{ color: "#F34723" }}
              />
              <div>
                <p>Сертификат STELS.pdf</p>
                <p className={styles.pretitle}>Размер: 3,3 Mb</p>
              </div>
            </div>
            <div>
              <IconWrapper
                Icon={HiOutlineDocumentArrowDown}
                size={24}
                style={{ color: "#F34723" }}
              />
              <div>
                <p>Сертификат STELS.pdf</p>
                <p className={styles.pretitle}>Размер: 3,3 Mb</p>
              </div>
            </div>
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

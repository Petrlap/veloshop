import React from "react";
import styles from "./Сharacteristics.module.css";
import imgMini from "../../assets/mini.webp";
import { MiniCard } from "../MiniCard/MiniCard";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";

interface Attribute {
  id: number;
  value: string;
}

interface СharacteristicsProps {
  attributes?: Attribute[];
  documents?: Array<{
    name: string;
    size: string;
    url: string;
  }>;
}

// Правильный маппинг на основе ваших реальных ID
const ATTRIBUTE_NAMES: Record<number, string> = {
  4: "Тормоза",
  5: "Цепь",
  6: "Каретка",
  8: "Шатуны",
  9: "Педали",
  10: "Вилка",
  11: "Обода",
  12: "Подседельный штырь",
  13: "Рулевая колонка",
  14: "Седло",
  15: "Втулки",
  16: "Покрышки",
  17: "Руль",
  18: "Трещотка",
  19: "Вынос руля",
  20: "Материал рамы",
  21: "Руль (размер)",
  22: "Защита пера",
  23: "Защита цепи",
  24: "Защита диска",
  25: "Крылья",
};

export const Сharacteristics: React.FC<СharacteristicsProps> = ({
  attributes = [],
  documents = [],
}) => {
  console.log("Характеристики получены:", attributes);

  const minicard = [
    {
      image: imgMini,
      year: "2024",
      sale: "23%",
      title: "Женский велосипед Welt Edelweiss 2.0 HD27...",
    },
  ];

  // Сортируем атрибуты по ID для консистентного отображения
  const sortedAttributes = [...attributes].sort((a, b) => a.id - b.id);

  const hasAttributes = attributes && attributes.length > 0;

  return (
    <section className={styles.characteristics}>
      <div className={styles.informationBlock}>
        <div className={styles.characteristicsBlock}>
          <h2>Характеристики</h2>
          <div>
            {hasAttributes ? (
              sortedAttributes.map((attr) => (
                <div key={attr.id} className={styles.characteristicsItem}>
                  <p className={styles.name}>
                    {ATTRIBUTE_NAMES[attr.id] || `Характеристика ${attr.id}`}
                  </p>
                  <span></span>
                  <p className={styles.value}>{attr.value}</p>
                </div>
              ))
            ) : (
              // Статическая заглушка если нет атрибутов
              <>
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
              </>
            )}
          </div>
        </div>

        <div className={styles.documentsBlock}>
          <h2>Документы</h2>
          <div className={styles.documentsList}>
            {documents && documents.length > 0 ? (
              documents.map((doc, index) => (
                <div key={index}>
                  <IconWrapper
                    Icon={HiOutlineDocumentArrowDown}
                    size={24}
                    style={{ color: "#F34723" }}
                  />
                  <div>
                    <p>{doc.name}</p>
                    <p className={styles.pretitle}>Размер: {doc.size}</p>
                  </div>
                </div>
              ))
            ) : (
              // Статические документы
              <>
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
              </>
            )}
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

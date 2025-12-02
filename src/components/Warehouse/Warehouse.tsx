import React, { useState, useEffect } from "react";
import styles from "./Warehouse.module.css";
import img1 from "../../assets/warehouse/image-1.webp";
import img2 from "../../assets/warehouse/image-2.webp";
import img3 from "../../assets/warehouse/image-3.webp";
import img4 from "../../assets/warehouse/image-4.webp";
import img5 from "../../assets/warehouse/image-1.webp";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IconWrapper } from "../IconWrapper/IconWrapper";

const warehouses = [
  {
    image: img1,
  },
  {
    image: img2,
  },
  {
    image: img3,
  },
  {
    image: img4,
  },
  {
    image: img5,
  },
];

export const Warehouse: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 600) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = warehouses.length - visibleCount;

  const handlePrev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <section className={styles.warehouse}>
      <div className={styles.textBlock}>
        <h2>
          <span>Крупнейший склад</span> магазина велосипедов велошоп
        </h2>
        <p>Сотни моделей в наличии, быстрая доставка, широкий выбор</p>
      </div>
      <div className={styles.warehouses}>
        <div className={styles.head}>
          <h3>Фотографии склада велошопа</h3>
          <div className={styles.buttons}>
            <button
              onClick={handlePrev}
              disabled={index === 0}
              className={`${styles.navBtn} ${
                index === 0 ? styles.disabled : ""
              }`}
            >
              <IconWrapper Icon={HiChevronLeft} size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={index === maxIndex}
              className={`${styles.navBtn} ${
                index === maxIndex ? styles.disabled : ""
              }`}
            >
              <IconWrapper Icon={HiChevronRight} size={24} />
            </button>
          </div>
        </div>

        <div className={styles.slider}>
          <div
            className={styles.track}
            style={{
              transform: `translateX(-${index * (100 / visibleCount)}%)`,
            }}
          >
            {warehouses.map((warehouse, i) => (
              <div key={i} className={styles.slide}>
                <img src={warehouse.image} alt={`video-${i}`} />
              </div>
            ))}
          </div>
        </div>

        <a href="#">Смотреть все фотографии {">"}</a>
      </div>
    </section>
  );
};

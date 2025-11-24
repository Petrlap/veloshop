import React, { useState } from "react";
import styles from "./Brands.module.css";
import img1 from "../../assets/bg.webp";
import img2 from "../../assets/bg.webp";
import img3 from "../../assets/bg.webp";
import img4 from "../../assets/bg.webp";
import img5 from "../../assets/bg.webp";
import img6 from "../../assets/bg.webp";
import img7 from "../../assets/bg.webp";
import img8 from "../../assets/bg.webp";
import img9 from "../../assets/bg.webp";
import img10 from "../../assets/bg.webp";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Brands: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  return (
    <div className={styles.wrapper}>
      {!expanded && (
        <div className={styles.rowScroll}>
          {images.slice(0, 6).map((src, i) => (
            <img key={i} src={src} className={styles.logo} alt="brand" />
          ))}
        </div>
      )}

      {expanded && (
        <div className={styles.grid}>
          {images.map((src, i) => (
            <img key={i} src={src} className={styles.logo} alt="brand" />
          ))}
        </div>
      )}

      <button
        className={styles.toggleBtn}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Скрыть бренды" : "Показать больше брендов"}
        {expanded ? (
          <IconWrapper
            Icon={IoIosArrowUp}
            size={16}
            style={{
              color: "#1D93D2",
            }}
          />
        ) : (
          <IconWrapper
            Icon={IoIosArrowDown}
            size={16}
            style={{
              color: "#1D93D2",
            }}
          />
        )}
      </button>
    </div>
  );
};

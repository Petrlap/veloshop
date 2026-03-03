import React, { useState } from "react";
import styles from "./Brands.module.css";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    (id: string): string;
  };
};

export const Brands: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const importAll = (r: any): string[] => {
    return r.keys().map(r);
  };

  const images = importAll(
    require.context("../../assets/brandshomepage", false, /\.webp$/)
  );

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

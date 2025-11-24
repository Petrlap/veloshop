import React, { useState } from "react";
import styles from "./MiniFilter.module.css";

export const MiniFilter: React.FC = () => {
  const [priceMin, setPriceMin] = useState(3550);
  const [priceMax, setPriceMax] = useState(1484910);
  const [type, setType] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [brand, setBrand] = useState("");
  const [inStock, setInStock] = useState(false);
  const [withDiscount, setWithDiscount] = useState(false);
  const [videoReview, setVideoReview] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.rangeBlock}>
          <div className={styles.priceInput}>
            <span className={styles.prefix}>от:</span>
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(Number(e.target.value))}
            />
            <span className={styles.suffix}>₽</span>
          </div>
          <input
            type="range"
            min={0}
            max={2000000}
            value={priceMax}
            style={
              {
                "--val": priceMax,
                "--min": 0,
                "--max": 2000000,
              } as React.CSSProperties
            }
            onChange={(e) => setPriceMax(Number(e.target.value))}
          />
        </div>
        <div className={styles.rangeBlock}>
          <div className={styles.priceInput}>
            <span className={styles.prefix}>до:</span>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
            />
            <span className={styles.suffix}>₽</span>
          </div>
          <input
            type="range"
            min={0}
            max={2000000}
            value={priceMax}
            style={
              {
                "--val": priceMax,
                "--min": 0,
                "--max": 2000000,
              } as React.CSSProperties
            }
            onChange={(e) => setPriceMax(Number(e.target.value))}
          />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={styles.select}
        >
          <option value="" hidden>
            Тип
          </option>
          <option value="mtb">Горный</option>
          <option value="road">Шоссейный</option>
        </select>
        <input
          type="number"
          placeholder="Рост"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className={styles.input}
        />
        <select
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          className={styles.select}
        >
          <option value="" hidden>
            Диаметр колёс
          </option>
          <option value="26">26"</option>
          <option value="27.5">27.5"</option>
          <option value="29">29"</option>
        </select>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={styles.select}
        >
          <option value="" hidden>
            Бренд
          </option>
          <option value="stels">Stels</option>
          <option value="format">Format</option>
        </select>

        <button className={styles.showButton}>ПОКАЗАТЬ</button>
      </div>
      <div className={styles.rowCheckboxes}>
        <label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => setInStock(!inStock)}
          />
          Только в наличии
        </label>

        <label>
          <input
            type="checkbox"
            checked={withDiscount}
            onChange={() => setWithDiscount(!withDiscount)}
          />
          Со скидкой
        </label>

        <label>
          <input
            type="checkbox"
            checked={videoReview}
            onChange={() => setVideoReview(!videoReview)}
          />
          Видеообзор
        </label>
      </div>
    </div>
  );
};

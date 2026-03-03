import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MiniFilter.module.css";

export const MiniFilter: React.FC = () => {
  const navigate = useNavigate();

  // Состояния фильтров
  const [priceMin, setPriceMin] = useState(3550);
  const [priceMax, setPriceMax] = useState(1484910);
  const [type, setType] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [brand, setBrand] = useState("");
  const [inStock, setInStock] = useState(false);
  const [withDiscount, setWithDiscount] = useState(false);
  const [videoReview, setVideoReview] = useState(false);

  // Функция построения URL с параметрами фильтрации
  const buildFilterUrl = () => {
    const params = new URLSearchParams();

    // Цена
    if (priceMin > 0) params.append("price_from", priceMin.toString());
    if (priceMax < 2000000) params.append("price_to", priceMax.toString());

    // Тип велосипеда
    if (type) params.append("type", type);

    // Рост
    if (height) params.append("height", height);

    // Диаметр колес
    if (diameter) params.append("wheel_diameter", diameter);

    // Бренд
    if (brand) params.append("brands", brand);

    // Чекбоксы
    if (inStock) params.append("in_stock", "true");
    if (withDiscount) params.append("with_discount", "true");
    if (videoReview) params.append("with_video", "true");

    return `/fullcatalog?${params.toString()}`;
  };

  const handleShowClick = () => {
    const url = buildFilterUrl();
    navigate(url);
  };

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
          <option value="Горный">Горный</option>
          <option value="Шоссейный">Шоссейный</option>
          <option value="Городской">Городской</option>
          <option value="Детский">Детский</option>
          <option value="BMX">BMX</option>
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
          <option value="10">10"</option>
          <option value="12">12"</option>
          <option value="14">14"</option>
          <option value="16">16"</option>
          <option value="18">18"</option>
          <option value="20">20"</option>
          <option value="24">24"</option>
          <option value="26">26"</option>
          <option value="27.5">27.5"</option>
          <option value="28">28"</option>
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
          <option value="Stels">Stels</option>
          <option value="Format">Format</option>
          <option value="Forward">Forward</option>
          <option value="Merida">Merida</option>
          <option value="Giant">Giant</option>
        </select>

        <button className={styles.showButton} onClick={handleShowClick}>
          ПОКАЗАТЬ
        </button>
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

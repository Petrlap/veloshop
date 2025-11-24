// BigFilter.tsx
import { useState } from "react";
import styles from "./BigFilter.module.css";

export const BigFilter = () => {
  const [selectedCity, setSelectedCity] = useState("Москва");
  const [weightRange, setWeightRange] = useState({ min: 20, max: 250 });
  const [maxLoad, setMaxLoad] = useState({ min: 20, max: 150 });

  // Цвета для выбора
  const colors = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ffa500",
    "#800080",
    "#ffc0cb",
    "#a52a2a",
    "#808080",
    "#964b00",
    "#000080",
  ];

  return (
    <div className={styles.container}>
      {/* Первая строка фильтров */}
      <div className={styles.filterRow}>
        {/* Стоимость */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Стоимость</h3>
          <div className={styles.priceRange}>
            <div className={styles.priceInputs}>
              <span>от:</span>
              <input type="text" value="1 990" className={styles.priceInput} />
              <span>до:</span>
              <input
                type="text"
                value="1 755 000"
                className={styles.priceInput}
              />
              <span>p</span>
            </div>
            <div className={styles.priceQuick}>
              <button className={styles.priceBtn}>До 20 000 ₽</button>
              <button className={styles.priceBtn}>До 30 000 ₽</button>
              <button className={styles.priceBtn}>До 35 000 ₽</button>
              <button className={styles.priceBtn}>До 40 000 ₽</button>
              <button className={styles.priceBtn}>До 50 000 ₽</button>
              <button className={styles.priceBtn}>До 100 000 ₽</button>
            </div>
          </div>
        </div>

        {/* Тип */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Тип</h3>
          <div className={styles.typeColumns}>
            <div className={styles.column}>
              {[
                "Все велосипеды",
                "Женские велосипеды",
                "Детские велосипеды",
                "Складные велосипеды",
                "Двухподвесы",
                "ВМХ",
                "Комфортные велосипеды",
                "Фэтбайки",
              ].map((type) => (
                <label key={type} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{type}</span>
                </label>
              ))}
            </div>
            <div className={styles.column}>
              {[
                "Горные велосипеды",
                "Гравийные велосипеды",
                "Подростковые велосипеды",
                "Дорожные велосипеды",
                "Электровелосипеды",
                "Шоссейные велосипеды",
                "Туристические велосипеды",
                "VIP велосипеды",
              ].map((type) => (
                <label key={type} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Бренд */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Бренд</h3>
          <div className={styles.brandColumns}>
            <div className={styles.column}>
              {[
                "Aspect X/IT",
                "Forward",
                "Novatrack",
                "Stinger X/IT",
                "Superior VIP",
                "Sunpeed",
                "Hagen",
                "Polygon",
              ].map((brand) => (
                <label key={brand} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
            <div className={styles.column}>
              {[
                "Maxiscoo",
                "Bianchi",
                "Медведь",
                "Merida",
                "Ghost",
                "Red Pepper",
                "Masi",
                "Winora",
              ].map((brand) => (
                <label key={brand} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
            <div className={styles.column}>
              {[
                "Stats",
                "Start",
                "KTM",
                "Format",
                "Atom",
                "DRAG",
                "ECSI",
                "Rock Machine",
              ].map((brand) => (
                <label key={brand} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
            <div className={styles.column}>
              {[
                "Halbike",
                "Pifagor",
                "Bear Bike",
                "Giant",
                "FOXX",
                "Pardus",
                "Fixie",
              ].map((brand) => (
                <label key={brand} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Вторая строка фильтров */}
      <div className={styles.filterRow}>
        {/* Ростовая */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Ростовая</h3>
          <p className={styles.description}>
            Подходящий размер рамы или колеса лучше всего определить по росту.
          </p>
          <div className={styles.wheelSizes}>
            {["29°", "28°", "27.5°", "26°", "24°", "18°", "14°", "10°"].map(
              (size) => (
                <label key={size} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{size}</span>
                </label>
              )
            )}
          </div>
          <p className={styles.note}>
            Подбор велосипедов по росту носит ознакомительный характер.
            Уточняйте соответствие у консультанта.
          </p>
        </div>

        {/* Диаметр колес и тип обода */}
        <div className={styles.filterGroup}>
          <div className={styles.doubleFilter}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterSubtitle}>Диаметр колес</h3>
              <div className={styles.wheelDiameter}>
                <div className={styles.checkboxColumn}>
                  {["29°", "28°", "27.5°", "26°", "24°", "20°"].map((size) => (
                    <label key={size} className={styles.checkboxLabel}>
                      <input type="checkbox" />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
                <div className={styles.checkboxColumn}>
                  {["18°", "16°", "14°", "12°", "10°"].map((size) => (
                    <label key={size} className={styles.checkboxLabel}>
                      <input type="checkbox" />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterSubtitle}>Тип обода</h3>
              <div className={styles.rimType}>
                {["Литые", "Одинарные", "Двойные", "Усиленные"].map((type) => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Вилка */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterSubtitle}>Вилка</h3>
            <div className={styles.forkTypes}>
              <div className={styles.checkboxColumn}>
                {[
                  "Амортизационная",
                  "Воздушно-масляная",
                  "Воздушно-масляная с блокировкой",
                  "Пружинно-масляная",
                ].map((type) => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              <div className={styles.checkboxColumn}>
                {[
                  "Пружинно-масляная с блокировкой",
                  "Пружинно-эластомерная",
                  "Пружинно-эластомерная с блокировкой",
                  "Жесткая",
                ].map((type) => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Вес и Цвет */}
        <div className={styles.filterGroup}>
          <div className={styles.doubleFilter}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterSubtitle}>Вес</h3>
              <div className={styles.weightRange}>
                <div className={styles.rangeInputs}>
                  <input
                    type="text"
                    value={`${weightRange.min} кг`}
                    className={styles.rangeInput}
                    readOnly
                  />
                  <span>-</span>
                  <input
                    type="text"
                    value={`${weightRange.max} кг`}
                    className={styles.rangeInput}
                    readOnly
                  />
                </div>
                <div className={styles.rangeSlider}>
                  <div
                    className={styles.sliderTrack}
                    style={
                      {
                        "--min-percent": `${
                          ((weightRange.min - 20) / (250 - 20)) * 100
                        }%`,
                        "--max-percent": `${
                          ((weightRange.max - 20) / (250 - 20)) * 100
                        }%`,
                      } as React.CSSProperties
                    }
                  />
                  <input
                    type="range"
                    min="20"
                    max="250"
                    value={weightRange.min}
                    onChange={(e) => {
                      const value = Math.min(
                        parseInt(e.target.value),
                        weightRange.max - 1
                      );
                      setWeightRange((prev) => ({ ...prev, min: value }));
                    }}
                    className={styles.slider}
                  />
                  <input
                    type="range"
                    min="20"
                    max="250"
                    value={weightRange.max}
                    onChange={(e) => {
                      const value = Math.max(
                        parseInt(e.target.value),
                        weightRange.min + 1
                      );
                      setWeightRange((prev) => ({ ...prev, max: value }));
                    }}
                    className={styles.slider}
                  />
                </div>
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterSubtitle}>Максимальная нагрузка</h3>
              <div className={styles.weightRange}>
                <div className={styles.rangeInputs}>
                  <input
                    type="text"
                    value={`${maxLoad.min} кг`}
                    className={styles.rangeInput}
                    readOnly
                  />
                  <span>-</span>
                  <input
                    type="text"
                    value={`${maxLoad.max} кг`}
                    className={styles.rangeInput}
                    readOnly
                  />
                </div>
                <div className={styles.rangeSlider}>
                  <div
                    className={styles.sliderTrack}
                    style={
                      {
                        "--min-percent": `${
                          ((maxLoad.min - 20) / (150 - 20)) * 100
                        }%`,
                        "--max-percent": `${
                          ((maxLoad.max - 20) / (150 - 20)) * 100
                        }%`,
                      } as React.CSSProperties
                    }
                  />
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={maxLoad.min}
                    onChange={(e) => {
                      const value = Math.min(
                        parseInt(e.target.value),
                        maxLoad.max - 1
                      );
                      setMaxLoad((prev) => ({ ...prev, min: value }));
                    }}
                    className={styles.slider}
                  />
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={maxLoad.max}
                    onChange={(e) => {
                      const value = Math.max(
                        parseInt(e.target.value),
                        maxLoad.min + 1
                      );
                      setMaxLoad((prev) => ({ ...prev, max: value }));
                    }}
                    className={styles.slider}
                  />
                </div>
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterSubtitle}>Цвет</h3>
              <div className={styles.colorGrid}>
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={styles.colorCircle}
                    style={{ backgroundColor: color }}
                    title={`Цвет ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Третья строка фильтров */}
      <div className={styles.filterRow}>
        {/* Модельный год */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterSubtitle}>Модельный год</h3>
          <div className={styles.yearGrid}>
            <div className={styles.checkboxColumn}>
              {["2026", "2025", "2024", "2023", "2022"].map((year) => (
                <label key={year} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{year}</span>
                </label>
              ))}
            </div>
            <div className={styles.checkboxColumn}>
              {["2021", "2020", "2019", "2018"].map((year) => (
                <label key={year} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{year}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Тормоза */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterSubtitle}>Тормоза</h3>
          <div className={styles.brakesGrid}>
            {[
              "Без тормозов",
              "Дисковые гидравлические",
              "Дисковые механические",
              "Ножные",
              "Роллерные",
            ].map((brake) => (
              <label key={brake} className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>{brake}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Материал рамы */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterSubtitle}>Материал рамы</h3>
          <div className={styles.materialGrid}>
            {[
              "Магниевый сплав",
              "Пластик",
              "Хромолибден",
              "Алюминий",
              "Сталь",
              "Карбон",
            ].map((material) => (
              <label key={material} className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>{material}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Четвертая строка фильтров */}
      <div className={styles.filterRow}>
        {/* Уровень оборудования */}
        <div className={styles.equipmentGroup}>
          <h3 className={styles.filterSubtitle}>Уровень оборудования</h3>
          <div className={styles.equipmentContent}>
            <div className={styles.equipmentLevel}>
              {[
                "Начальное",
                "Любительское",
                "Полупрофессиональное",
                "Профессиональное",
              ].map((level) => (
                <label key={level} className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>{level}</span>
                </label>
              ))}
            </div>

            <div className={styles.equipmentBrands}>
              <div className={styles.brandColumns}>
                <div className={styles.column}>
                  {[
                    "SRAM",
                    "Shimano",
                    "microSHIFT",
                    "APEX",
                    "Cues",
                    "Sword",
                    "FORCE",
                    "Essa",
                    "ADVENT X",
                    "GX",
                  ].map((brand) => (
                    <label key={brand} className={styles.checkboxLabel}>
                      <input type="checkbox" />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
                <div className={styles.column}>
                  {[
                    "ADVENT",
                    "GX Eagle",
                    "Altus",
                    "ACOLYTE",
                    "NX",
                    "Асега",
                    "XCD",
                    "NX Eagle",
                    "Alivio",
                    "XLE",
                  ].map((brand) => (
                    <label key={brand} className={styles.checkboxLabel}>
                      <input type="checkbox" />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
                <div className={styles.column}>
                  {[
                    "RIVAL",
                    "Claris",
                    "MEZZO",
                    "SX Eagle",
                    "Deore",
                    "CENTOS",
                    "SX4",
                    "Dura Ace",
                    "R9",
                    "SX5",
                  ].map((brand) => (
                    <label key={brand} className={styles.checkboxLabel}>
                      <input type="checkbox" />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
                <div className={styles.column}>
                  {[
                    "DIZ",
                    "R8",
                    "X01 Eagle",
                    "GRX",
                    "M Series",
                    "XX",
                    "Nexus",
                    "LTMOO",
                    "XX SL Eagle",
                    "Sora",
                  ].map((brand) => (
                    <label key={brand} className={styles.checkboxLabel}>
                      <input type="checkbox" />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
                <div className={styles.column}>
                  {[
                    "TWO",
                    "XX1 Eagle",
                    "Tourney",
                    "V4006",
                    "XX1",
                    "ATR",
                    "A3",
                    "XTR",
                    "Tiagra",
                    "A2",
                  ].map((brand) => (
                    <label key={brand} className={styles.checkboxLabel}>
                      <input type="checkbox" />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
                <div className={styles.column}>
                  {[
                    "Uttegra",
                    "Cougroth",
                    "Uttegra Diz",
                    "Bugeoобзор",
                    "Uttegra Diz",
                    "Поябрань",
                  ].map((brand) => (
                    <label key={brand} className={styles.checkboxLabel}>
                      <input type="checkbox" />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Наличие в магазинах */}
        <div className={styles.storesGroup}>
          <h3 className={styles.filterSubtitle}>Наличие в магазинах</h3>
          <div className={styles.citySelector}>
            <span>Ваш город:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={styles.citySelect}
            >
              <option value="Москва">Москва</option>
              <option value="Санкт-Петербург">Санкт-Петербург</option>
            </select>
          </div>
          <div className={styles.shopsList}>
            {[
              "Отрадное (Сигнальный проезд, д.17)",
              "Ленинский (Ленинский проспект, 99)",
              "Варшавка (Варшавское шоссе, 18, к.1)",
              "Сокол (Волоколамское шоссе, 6)",
              "Балашиха (шоссе Энтузиастов, вл.Илит28)",
              "Интернет-магазин",
            ].map((shop) => (
              <label key={shop} className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>{shop}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <button className={styles.showButton}>ПОКАЗАТЬ</button>
    </div>
  );
};

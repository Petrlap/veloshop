// BigFilter.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BigFilter.module.css";

export const BigFilter = () => {
  const navigate = useNavigate();

  // Состояния для всех фильтров
  const [selectedCity, setSelectedCity] = useState("Москва");
  const [weightRange, setWeightRange] = useState({ min: 20, max: 250 });
  const [maxLoad, setMaxLoad] = useState({ min: 20, max: 150 });

  // Состояния для выбранных значений
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedWheelSizes, setSelectedWheelSizes] = useState<string[]>([]);
  const [selectedRimTypes, setSelectedRimTypes] = useState<string[]>([]);
  const [selectedForks, setSelectedForks] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedBrakes, setSelectedBrakes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedEquipmentBrands, setSelectedEquipmentBrands] = useState<
    string[]
  >([]);
  const [selectedShops, setSelectedShops] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Цены
  const [priceMin, setPriceMin] = useState(1990);
  const [priceMax, setPriceMax] = useState(1755000);

  // Чекбоксы наличия/состояния
  const [inStock, setInStock] = useState(false);
  const [withDiscount, setWithDiscount] = useState(false);
  const [videoReview, setVideoReview] = useState(false);

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

  // Функция построения URL с параметрами фильтрации
  const buildFilterUrl = () => {
    const params = new URLSearchParams();

    // Цена
    if (priceMin > 1990) params.append("price_from", priceMin.toString());
    if (priceMax < 1755000) params.append("price_to", priceMax.toString());

    // Типы (массив в строку через запятую)
    if (selectedTypes.length > 0)
      params.append("types", selectedTypes.join(","));

    // Бренды
    if (selectedBrands.length > 0)
      params.append("brands", selectedBrands.join(","));

    // Диаметр колес
    if (selectedWheelSizes.length > 0)
      params.append("wheel_diameter", selectedWheelSizes.join(","));

    // Тип обода
    if (selectedRimTypes.length > 0)
      params.append("rim_type", selectedRimTypes.join(","));

    // Вилка
    if (selectedForks.length > 0)
      params.append("fork", selectedForks.join(","));

    // Год
    if (selectedYears.length > 0)
      params.append("years", selectedYears.join(","));

    // Тормоза
    if (selectedBrakes.length > 0)
      params.append("brakes", selectedBrakes.join(","));

    // Материал рамы
    if (selectedMaterials.length > 0)
      params.append("material", selectedMaterials.join(","));

    // Цвета (hex коды)
    if (selectedColors.length > 0)
      params.append("colors", selectedColors.join(","));

    // Вес
    if (weightRange.min > 20)
      params.append("weight_from", weightRange.min.toString());
    if (weightRange.max < 250)
      params.append("weight_to", weightRange.max.toString());

    // Нагрузка
    if (maxLoad.min > 20) params.append("load_from", maxLoad.min.toString());
    if (maxLoad.max < 150) params.append("load_to", maxLoad.max.toString());

    // Чекбоксы
    if (inStock) params.append("in_stock", "true");
    if (withDiscount) params.append("with_discount", "true");
    if (videoReview) params.append("with_video", "true");

    // Город (можно использовать для фильтрации по наличию)
    if (selectedCity !== "Москва") params.append("city", selectedCity);

    return `/fullcatalog?${params.toString()}`;
  };

  const handleShowClick = () => {
    const url = buildFilterUrl();
    navigate(url);
  };

  // Обработчики для чекбоксов
  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleWheelSizeChange = (size: string) => {
    setSelectedWheelSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorClick = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

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
              <input
                type="text"
                value={priceMin.toLocaleString()}
                onChange={(e) =>
                  setPriceMin(Number(e.target.value.replace(/\s/g, "")))
                }
                className={styles.priceInput}
              />
              <span>до:</span>
              <input
                type="text"
                value={priceMax.toLocaleString()}
                onChange={(e) =>
                  setPriceMax(Number(e.target.value.replace(/\s/g, "")))
                }
                className={styles.priceInput}
              />
              <span>p</span>
            </div>
            <div className={styles.priceQuick}>
              <button
                className={styles.priceBtn}
                onClick={() => setPriceMax(20000)}
              >
                До 20 000 ₽
              </button>
              <button
                className={styles.priceBtn}
                onClick={() => setPriceMax(30000)}
              >
                До 30 000 ₽
              </button>
              <button
                className={styles.priceBtn}
                onClick={() => setPriceMax(35000)}
              >
                До 35 000 ₽
              </button>
              <button
                className={styles.priceBtn}
                onClick={() => setPriceMax(40000)}
              >
                До 40 000 ₽
              </button>
              <button
                className={styles.priceBtn}
                onClick={() => setPriceMax(50000)}
              >
                До 50 000 ₽
              </button>
              <button
                className={styles.priceBtn}
                onClick={() => setPriceMax(100000)}
              >
                До 100 000 ₽
              </button>
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
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
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
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
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
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
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
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
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
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
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
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
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
                  <input
                    type="checkbox"
                    checked={selectedWheelSizes.includes(size.replace("°", ""))}
                    onChange={() =>
                      handleWheelSizeChange(size.replace("°", ""))
                    }
                  />
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
                      <input
                        type="checkbox"
                        checked={selectedWheelSizes.includes(
                          size.replace("°", "")
                        )}
                        onChange={() =>
                          handleWheelSizeChange(size.replace("°", ""))
                        }
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
                <div className={styles.checkboxColumn}>
                  {["18°", "16°", "14°", "12°", "10°"].map((size) => (
                    <label key={size} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedWheelSizes.includes(
                          size.replace("°", "")
                        )}
                        onChange={() =>
                          handleWheelSizeChange(size.replace("°", ""))
                        }
                      />
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
                    <input
                      type="checkbox"
                      checked={selectedRimTypes.includes(type)}
                      onChange={() =>
                        setSelectedRimTypes((prev) =>
                          prev.includes(type)
                            ? prev.filter((t) => t !== type)
                            : [...prev, type]
                        )
                      }
                    />
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
                    <input
                      type="checkbox"
                      checked={selectedForks.includes(type)}
                      onChange={() =>
                        setSelectedForks((prev) =>
                          prev.includes(type)
                            ? prev.filter((t) => t !== type)
                            : [...prev, type]
                        )
                      }
                    />
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
                    <input
                      type="checkbox"
                      checked={selectedForks.includes(type)}
                      onChange={() =>
                        setSelectedForks((prev) =>
                          prev.includes(type)
                            ? prev.filter((t) => t !== type)
                            : [...prev, type]
                        )
                      }
                    />
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
                    className={`${styles.colorCircle} ${
                      selectedColors.includes(color) ? styles.selected : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
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
                  <input
                    type="checkbox"
                    checked={selectedYears.includes(year)}
                    onChange={() =>
                      setSelectedYears((prev) =>
                        prev.includes(year)
                          ? prev.filter((y) => y !== year)
                          : [...prev, year]
                      )
                    }
                  />
                  <span>{year}</span>
                </label>
              ))}
            </div>
            <div className={styles.checkboxColumn}>
              {["2021", "2020", "2019", "2018"].map((year) => (
                <label key={year} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedYears.includes(year)}
                    onChange={() =>
                      setSelectedYears((prev) =>
                        prev.includes(year)
                          ? prev.filter((y) => y !== year)
                          : [...prev, year]
                      )
                    }
                  />
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
                <input
                  type="checkbox"
                  checked={selectedBrakes.includes(brake)}
                  onChange={() =>
                    setSelectedBrakes((prev) =>
                      prev.includes(brake)
                        ? prev.filter((b) => b !== brake)
                        : [...prev, brake]
                    )
                  }
                />
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
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material)}
                  onChange={() =>
                    setSelectedMaterials((prev) =>
                      prev.includes(material)
                        ? prev.filter((m) => m !== material)
                        : [...prev, material]
                    )
                  }
                />
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
                  <input
                    type="checkbox"
                    checked={selectedEquipment.includes(level)}
                    onChange={() =>
                      setSelectedEquipment((prev) =>
                        prev.includes(level)
                          ? prev.filter((l) => l !== level)
                          : [...prev, level]
                      )
                    }
                  />
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
                      <input
                        type="checkbox"
                        checked={selectedEquipmentBrands.includes(brand)}
                        onChange={() =>
                          setSelectedEquipmentBrands((prev) =>
                            prev.includes(brand)
                              ? prev.filter((b) => b !== brand)
                              : [...prev, brand]
                          )
                        }
                      />
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
                      <input
                        type="checkbox"
                        checked={selectedEquipmentBrands.includes(brand)}
                        onChange={() =>
                          setSelectedEquipmentBrands((prev) =>
                            prev.includes(brand)
                              ? prev.filter((b) => b !== brand)
                              : [...prev, brand]
                          )
                        }
                      />
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
                      <input
                        type="checkbox"
                        checked={selectedEquipmentBrands.includes(brand)}
                        onChange={() =>
                          setSelectedEquipmentBrands((prev) =>
                            prev.includes(brand)
                              ? prev.filter((b) => b !== brand)
                              : [...prev, brand]
                          )
                        }
                      />
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
                      <input
                        type="checkbox"
                        checked={selectedEquipmentBrands.includes(brand)}
                        onChange={() =>
                          setSelectedEquipmentBrands((prev) =>
                            prev.includes(brand)
                              ? prev.filter((b) => b !== brand)
                              : [...prev, brand]
                          )
                        }
                      />
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
                      <input
                        type="checkbox"
                        checked={selectedEquipmentBrands.includes(brand)}
                        onChange={() =>
                          setSelectedEquipmentBrands((prev) =>
                            prev.includes(brand)
                              ? prev.filter((b) => b !== brand)
                              : [...prev, brand]
                          )
                        }
                      />
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
                      <input
                        type="checkbox"
                        checked={selectedEquipmentBrands.includes(brand)}
                        onChange={() =>
                          setSelectedEquipmentBrands((prev) =>
                            prev.includes(brand)
                              ? prev.filter((b) => b !== brand)
                              : [...prev, brand]
                          )
                        }
                      />
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
                <input
                  type="checkbox"
                  checked={selectedShops.includes(shop)}
                  onChange={() =>
                    setSelectedShops((prev) =>
                      prev.includes(shop)
                        ? prev.filter((s) => s !== shop)
                        : [...prev, shop]
                    )
                  }
                />
                <span>{shop}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <button className={styles.showButton} onClick={handleShowClick}>
        ПОКАЗАТЬ
      </button>
    </div>
  );
};

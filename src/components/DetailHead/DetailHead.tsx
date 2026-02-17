import React, { useState, useEffect } from "react";
import styles from "./DetailHead.module.css";
import {
  FiHeart,
  FiCheck,
  FiShoppingCart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { BiCopy } from "react-icons/bi";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { PiShieldCheckBold, PiGift } from "react-icons/pi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { LuCircleCheck } from "react-icons/lu";
import { HiTruck } from "react-icons/hi2";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBoxes } from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";
import welt from "../../assets/brands/welt.webp";
import detail1 from "../../assets/detailpage/detail-bike-1.webp";
import detail2 from "../../assets/detailpage/detail-bike-2.webp";
import detail3 from "../../assets/detailpage/detail-bike-3.webp";
import detail4 from "../../assets/detailpage/detail-bike-4.webp";
import detail5 from "../../assets/detailpage/detail-bike-5.webp";
import detail6 from "../../assets/detailpage/detail-bike-6.webp";

const images = [detail1, detail2, detail3, detail4, detail5, detail6];

// Типы согласно JSON структуре
interface Price {
  id: number;
  offer_id: number;
  price_type: string | null;
  price: number;
}

interface OfferAttribute {
  id: number;
  value: string;
}

interface Offer {
  id: number;
  name: string;
  product_id: number;
  offer_id: string;
  vcode: string | null;
  articul_supplier: string;
  is_active: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  attributes: {
    data: OfferAttribute[];
  };
  prices: {
    data: Price[];
  };
  stock: {
    data: any[];
  };
}

interface ProductData {
  id: number;
  name: string;
  product_id: string;
  category_id: number;
  brand: string;
  "model ": string;
  seazon: string;
  offers: {
    data: Offer[];
  };
}

interface DetailHeadProps {
  product: ProductData;
}

export const DetailHead: React.FC<DetailHeadProps> = ({ product }) => {
  console.log("DetailHead получил product:", product);

  const [active, setActive] = useState(0);
  const [height, setHeight] = useState(175);
  const increase = () => setHeight((prev) => prev + 1);
  const decrease = () => setHeight((prev) => prev - 1);
  const [qty, setQty] = useState(1);

  // Состояния для выбора SKU
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // Для цветов и размеров
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [sizeOptions, setSizeOptions] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Маппинг цвет-размер к офферу для быстрого поиска
  const [offerMap, setOfferMap] = useState<Map<string, Offer>>(new Map());

  // Для UI
  const [colorOpen, setColorOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  // Константы для ID атрибутов
  const COLOR_ATTRIBUTE_ID = 157; // ID для цвета
  const SIZE_ATTRIBUTE_ID = 156; // ID для размера

  // Инициализация при получении product
  useEffect(() => {
    if (product && product.offers?.data && product.offers.data.length > 0) {
      const offersList = product.offers.data;
      setOffers(offersList);

      // Собираем уникальные цвета и размеры
      const colors = new Set<string>();
      const sizes = new Set<string>();
      const map = new Map<string, Offer>();

      offersList.forEach((offer) => {
        // Получаем цвет и размер из атрибутов
        const colorAttr = offer.attributes?.data?.find(
          (attr) => attr.id === COLOR_ATTRIBUTE_ID
        );
        const sizeAttr = offer.attributes?.data?.find(
          (attr) => attr.id === SIZE_ATTRIBUTE_ID
        );

        const color = colorAttr?.value || "";
        const size = sizeAttr?.value || "";

        if (color) colors.add(color);
        if (size) sizes.add(size);

        // Создаем ключ для маппинга
        if (color && size) {
          map.set(`${color}_${size}`, offer);
        }
      });

      setColorOptions(Array.from(colors));
      setSizeOptions(Array.from(sizes));
      setOfferMap(map);

      // Выбираем первый доступный offer по умолчанию
      if (offersList.length > 0) {
        const firstOffer = offersList[0];
        setSelectedOffer(firstOffer);

        // Устанавливаем выбранные цвет и размер из первого offer
        const firstColor =
          firstOffer.attributes?.data?.find(
            (attr) => attr.id === COLOR_ATTRIBUTE_ID
          )?.value || "";
        const firstSize =
          firstOffer.attributes?.data?.find(
            (attr) => attr.id === SIZE_ATTRIBUTE_ID
          )?.value || "";

        setSelectedColor(firstColor);
        setSelectedSize(firstSize);
      }

      console.log("Доступные цвета:", Array.from(colors));
      console.log("Доступные размеры:", Array.from(sizes));
    }
  }, [product]);

  // Обновление выбранного offer при изменении цвета или размера
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const key = `${selectedColor}_${selectedSize}`;
      const offer = offerMap.get(key);
      if (offer) {
        setSelectedOffer(offer);
        // Сбрасываем количество при смене оффера
        setQty(1);
      }
    }
  }, [selectedColor, selectedSize, offerMap]);

  // Функция для получения основной цены
  const getMainPrice = (offer: Offer | null): number => {
    if (!offer || !offer.prices?.data || offer.prices.data.length === 0)
      return 0;
    // Берем первую цену
    return offer.prices.data[0]?.price || 0;
  };

  // Проверка наличия товара
  const isInStock = (offer: Offer | null): boolean => {
    if (!offer || !offer.stock?.data) return false;
    return offer.stock.data.length > 0;
  };

  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU") + " ₽";
  };

  // Получение общего количества на всех складах
  const getTotalStock = (offer: Offer | null): number => {
    if (!offer || !offer.stock?.data) return 0;
    return offer.stock.data.length;
  };

  // Обработчики изменения количества
  const handleDecreaseQty = () => {
    setQty((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQty = () => {
    if (selectedOffer) {
      const maxStock = getTotalStock(selectedOffer);
      if (maxStock === 0) return;
      if (qty < maxStock) {
        setQty((prev) => prev + 1);
      }
    }
  };

  // Проверка доступности цвета для выбранного размера
  const isColorAvailable = (color: string): boolean => {
    if (!selectedSize) return true;
    return offerMap.has(`${color}_${selectedSize}`);
  };

  // Проверка доступности размера для выбранного цвета
  const isSizeAvailable = (size: string): boolean => {
    if (!selectedColor) return true;
    return offerMap.has(`${selectedColor}_${size}`);
  };

  // Получение всех доступных цветов
  const getAvailableColors = (): string[] => {
    return colorOptions;
  };

  // Получение всех доступных размеров
  const getAvailableSizes = (): string[] => {
    return sizeOptions;
  };

  // Если нет продукта или offers
  if (
    !product ||
    !product.offers?.data ||
    product.offers.data.length === 0 ||
    !selectedOffer
  ) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>
          {!product ? "Товар не загружен" : "Нет доступных вариантов товара"}
        </div>
      </div>
    );
  }

  const mainPrice = getMainPrice(selectedOffer);
  const inStock = isInStock(selectedOffer);
  const totalStock = getTotalStock(selectedOffer);
  const model = (product as any)["model "] || "";

  return (
    <section className={styles.wrapper}>
      {/* LEFT - Галерея */}
      <div className={styles.gallery}>
        <div className={styles.meta}>
          <span>
            Арт: {selectedOffer.offer_id}{" "}
            <IconWrapper Icon={BiCopy} style={{ color: "#545454" }} />
          </span>
          <span className={styles.inStock}>
            <IconWrapper
              Icon={FiCheck}
              style={{ color: inStock ? "#2BD53C" : "#ff0000" }}
            />
            {inStock ? "В наличии" : "Нет в наличии"}
            {inStock && totalStock > 0 && (
              <span className={styles.stockCount}>({totalStock} шт.)</span>
            )}
          </span>
          <button className={styles.compare}>
            <IconWrapper
              Icon={IoStatsChartSharp}
              style={{ color: "#000000" }}
            />
            Сравнить
          </button>
        </div>

        <div className={styles.imageBox}>
          <div className={styles.badges}>
            <span className={styles.hit}>HIT</span>
            <span className={styles.sale}>SALE</span>
          </div>
          <img
            src={images[active]}
            className={styles.mainImage}
            alt={product.name}
          />
          <button
            className={styles.navLeft}
            onClick={() =>
              setActive((active + images.length - 1) % images.length)
            }
          >
            <IconWrapper Icon={FiChevronLeft} />
          </button>
          <button
            className={styles.navRight}
            onClick={() => setActive((active + 1) % images.length)}
          >
            <IconWrapper Icon={FiChevronRight} />
          </button>
          <button className={styles.videoBtn}>
            <IconWrapper Icon={FaYoutube} style={{ color: "#1D93D2" }} />
            Видеообзор
          </button>
        </div>

        <div className={styles.thumbs}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`${styles.thumb} ${
                i === active ? styles.activeThumb : ""
              }`}
            >
              <img src={img} alt={`thumb-${i}`} />
            </button>
          ))}
        </div>
      </div>

      {/* CENTER - Информация о товаре */}
      <div className={styles.info}>
        <div className={styles.brandRow}>
          <div className={styles.brand}>
            <img src={welt} alt={product.brand} />
            {product.brand}
          </div>
          <span className={styles.warranty}>
            <IconWrapper
              Icon={PiShieldCheckBold}
              style={{ color: "#2BD53C" }}
            />
            Гарантия 2 года
          </span>
        </div>

        {/* Название товара */}
        <h1 className={styles.productTitle}>
          {selectedOffer.name || product.name}
        </h1>
        <p className={styles.productModel}>Модель: {model}</p>

        {/* Цены */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(mainPrice)}</span>
        </div>

        <p className={styles.viewers}>Эту модель смотрят сейчас 15 человек</p>

        <div className={styles.selectorBox}>
          Узнайте свой размер рамы, введя свой рост
          <div className={styles.heightSelector}>
            <span className={styles.heightValue}>{height}см</span>
            <div className={styles.arrows}>
              <span className={styles.arrowUp} onClick={increase}>
                <IconWrapper
                  Icon={IoIosArrowUp}
                  size={14}
                  style={{ color: "#606060" }}
                />
              </span>
              <span className={styles.arrowDown} onClick={decrease}>
                <IconWrapper
                  Icon={IoIosArrowDown}
                  size={14}
                  style={{ color: "#606060" }}
                />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.fit}>
          <IconWrapper Icon={LuCircleCheck} style={{ color: "#2CB742" }} />{" "}
          Подходит для вашего роста
        </div>

        {/* Выбор цвета и размера */}
        <div className={styles.options}>
          {/* Цвет */}
          {colorOptions.length > 0 && (
            <div className={styles.colorBox}>
              <label>Цвет</label>
              <div className={styles.selectWrapper}>
                <div
                  className={styles.select}
                  onClick={() => {
                    setColorOpen(!colorOpen);
                    setSizeOpen(false);
                  }}
                >
                  <span>{selectedColor || "Выберите цвет"}</span>
                  <span
                    className={`${styles.arrow} ${
                      colorOpen ? styles.open : ""
                    }`}
                  >
                    <IconWrapper
                      Icon={IoIosArrowDown}
                      size={14}
                      style={{ color: "#606060" }}
                    />
                  </span>
                </div>

                {colorOpen && (
                  <div className={styles.dropdown}>
                    {getAvailableColors().map((color) => {
                      const available = isColorAvailable(color);
                      return (
                        <div
                          key={color}
                          className={`${styles.option} ${
                            !available ? styles.disabledOption : ""
                          }`}
                          onClick={() => {
                            if (available) {
                              setSelectedColor(color);
                              setColorOpen(false);
                            }
                          }}
                        >
                          {color}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Размер */}
          {sizeOptions.length > 0 && (
            <div>
              <label>Размер</label>
              <div className={styles.selectWrapper}>
                <div
                  className={styles.select}
                  onClick={() => {
                    setSizeOpen(!sizeOpen);
                    setColorOpen(false);
                  }}
                >
                  <span>{selectedSize || "Выберите размер"}</span>
                  <span
                    className={`${styles.arrow} ${sizeOpen ? styles.open : ""}`}
                  >
                    <IconWrapper
                      Icon={IoIosArrowDown}
                      size={14}
                      style={{ color: "#606060" }}
                    />
                  </span>
                </div>

                {sizeOpen && (
                  <div className={styles.dropdown}>
                    {getAvailableSizes().map((size) => {
                      const available = isSizeAvailable(size);
                      return (
                        <div
                          key={size}
                          className={`${styles.option} ${
                            !available ? styles.disabledOption : ""
                          }`}
                          onClick={() => {
                            if (available) {
                              setSelectedSize(size);
                              setSizeOpen(false);
                            }
                          }}
                        >
                          {size}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Количество */}
          <div>
            <label>Количество</label>
            <div className={styles.counter}>
              <button
                onClick={handleDecreaseQty}
                disabled={qty <= 1}
                className={qty <= 1 ? styles.disabled : ""}
              >
                -
              </button>
              <span>{inStock ? qty : 0}</span>
              <button
                onClick={handleIncreaseQty}
                disabled={!inStock || (totalStock > 0 && qty >= totalStock)}
                className={
                  !inStock || (totalStock > 0 && qty >= totalStock)
                    ? styles.disabled
                    : ""
                }
              >
                +
              </button>
            </div>
            {inStock && totalStock > 0 && (
              <div className={styles.stockInfo}>Доступно: {totalStock} шт.</div>
            )}
          </div>
        </div>

        <div className={styles.gift}>
          <IconWrapper Icon={PiGift} size={24} style={{ color: "#F34723" }} />+
          Подарок: держатель для бутылки
        </div>

        <div className={styles.actions}>
          <button className={styles.cart} disabled={!inStock}>
            {inStock ? "В корзину" : "Нет в наличии"}{" "}
            <IconWrapper size={20} Icon={FiShoppingCart} />
          </button>
          <button className={styles.fav}>
            <IconWrapper Icon={FiHeart} size={24} />
          </button>
          <a className={styles.installment}>Рассрочка в 1 клик</a>
        </div>

        {/* Итоговая сумма */}
        <div className={styles.totalPrice}>
          <span>Итого:</span>
          <span className={styles.totalAmount}>
            {formatPrice(mainPrice * qty)}
          </span>
          {qty > 1 && (
            <span className={styles.pricePerUnit}>
              ({formatPrice(mainPrice)} за шт.)
            </span>
          )}
        </div>

        {/* Таблица всех доступных SKU */}
        {offers.length > 0 && (
          <div className={styles.skuSection}>
            <h3 className={styles.skuTitle}>Все варианты:</h3>
            <div className={styles.skuTable}>
              <div className={styles.skuHeader}>
                <span>Артикул</span>
                <span>Цвет</span>
                <span>Размер</span>
                <span>Цена</span>
                <span>Наличие</span>
              </div>
              {offers.map((offer) => {
                const offerPrice = getMainPrice(offer);
                const offerStock = getTotalStock(offer);
                const offerColor =
                  offer.attributes?.data?.find(
                    (attr) => attr.id === COLOR_ATTRIBUTE_ID
                  )?.value || "-";
                const offerSize =
                  offer.attributes?.data?.find(
                    (attr) => attr.id === SIZE_ATTRIBUTE_ID
                  )?.value || "-";
                const isCurrent = offer.id === selectedOffer?.id;

                return (
                  <div
                    key={offer.id}
                    className={`${styles.skuRow} ${
                      isCurrent ? styles.currentSku : ""
                    }`}
                    onClick={() => {
                      setSelectedOffer(offer);
                      if (offerColor !== "-") setSelectedColor(offerColor);
                      if (offerSize !== "-") setSelectedSize(offerSize);
                      setQty(1);
                    }}
                  >
                    <span className={styles.skuId}>{offer.offer_id}</span>
                    <span>{offerColor}</span>
                    <span>{offerSize}</span>
                    <span className={styles.skuPrice}>
                      {formatPrice(offerPrice)}
                    </span>
                    <span
                      className={
                        offerStock > 0
                          ? styles.inStockSku
                          : styles.outOfStockSku
                      }
                    >
                      {offerStock > 0 ? `${offerStock} шт.` : "Нет в наличии"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT - Сайдбар с доставкой */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarItem}>
          <IconWrapper
            Icon={FaMapMarkerAlt}
            size={24}
            style={{ color: "#6a6969" }}
          />
          <a>Забрать из магазина</a> сегодня
        </div>
        <div className={styles.sidebarItem}>
          <IconWrapper Icon={HiTruck} size={24} style={{ color: "#6a6969" }} />{" "}
          <a>Доставка</a> курьером завтра бесплатно
        </div>
        <div className={styles.sidebarItem}>
          <IconWrapper Icon={FaBoxes} size={24} style={{ color: "#6a6969" }} />{" "}
          <a>Где купить</a>
        </div>
        <div className={styles.sidebarItem}>
          <IconWrapper
            Icon={BsFillCreditCard2FrontFill}
            size={24}
            style={{ color: "#6a6969" }}
          />
          <a>Как оплатить</a>
        </div>
      </div>
    </section>
  );
};

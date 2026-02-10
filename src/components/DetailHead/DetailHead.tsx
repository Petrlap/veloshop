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
  type_price_id: number;
  type: string;
  title: string;
  price: number;
  currency: string;
}

interface Warehouse {
  warehouse_id: number;
  title: string;
  count: number;
}

interface Offer {
  id: number;
  offer_id: string;
  name: string;
  size: string | null;
  color: string | null;
  prices: Price[];
  warehouses: Warehouse[];
}

interface ProductData {
  id: number;
  product_id: string;
  name: string;
  brand: string;
  model: string;
  offers: Offer[];
}

// Пропсы компонента
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
  const [colorOpen, setColorOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  // Для заглушки
  const [color, setColor] = useState({
    name: "Бордовый",
    value: "#7b001c",
  });
  const [size, setSize] = useState('16"');

  // Состояния для SKU
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);

  // Инициализация при получении product
  useEffect(() => {
    if (product && product.offers && product.offers.length > 0) {
      const offers = product.offers;

      // Получаем уникальные цвета
      const colors: string[] = [];
      offers.forEach((offer) => {
        if (offer.color && !colors.includes(offer.color)) {
          colors.push(offer.color);
        }
      });

      // Получаем уникальные размеры
      const sizes: string[] = [];
      offers.forEach((offer) => {
        if (offer.size && !sizes.includes(offer.size)) {
          sizes.push(offer.size);
        }
      });

      setAvailableColors(colors);
      setAvailableSizes(sizes);

      // Выбираем первый offer по умолчанию
      const defaultOffer = offers[0];
      setCurrentOffer(defaultOffer);

      if (defaultOffer.color) {
        setSelectedColor(defaultOffer.color);
      }

      if (defaultOffer.size) {
        setSelectedSize(defaultOffer.size);
      }

      console.log("Доступные цвета:", colors);
      console.log("Доступные размеры:", sizes);
      console.log("Текущий offer:", defaultOffer);
    }
  }, [product]);

  // Функция для получения основной цены
  const getMainPrice = (offer: Offer | null): number => {
    if (!offer || !offer.prices || offer.prices.length === 0) return 0;
    const mainPrice = offer.prices.find(
      (p) => p.type_price_id === 1 || p.type === "price"
    );
    return mainPrice?.price || offer.prices[0]?.price || 0;
  };

  // Функция для получения старой цены
  const getOldPrice = (offer: Offer | null): number | null => {
    if (!offer || !offer.prices || offer.prices.length === 0) return null;
    const oldPrice = offer.prices.find(
      (p) => p.type === "price2" || p.type === "price1c"
    );
    return oldPrice?.price || null;
  };

  // Проверка наличия товара
  const isInStock = (offer: Offer | null): boolean => {
    if (!offer || !offer.warehouses) return false;
    return offer.warehouses.some((warehouse) => warehouse.count > 0);
  };

  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU") + " ₽";
  };

  // Получение общего количества на всех складах для текущего offer
  const getTotalStock = (offer: Offer | null): number => {
    if (!offer || !offer.warehouses) return 0;
    return offer.warehouses.reduce(
      (sum, warehouse) => sum + warehouse.count,
      0
    );
  };

  // Обработчики изменения количества
  const handleDecreaseQty = () => {
    setQty((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQty = () => {
    if (currentOffer) {
      const maxStock = getTotalStock(currentOffer);
      if (qty < maxStock) {
        setQty((prev) => prev + 1);
      }
    } else {
      setQty((prev) => prev + 1);
    }
  };

  // Если нет продукта или offers
  if (
    !product ||
    !product.offers ||
    product.offers.length === 0 ||
    !currentOffer
  ) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>
          {!product ? "Товар не загружен" : "Нет доступных вариантов товара"}
        </div>
      </div>
    );
  }

  const mainPrice = getMainPrice(currentOffer);
  const oldPrice = getOldPrice(currentOffer);
  const inStock = isInStock(currentOffer);
  const totalStock = getTotalStock(currentOffer);

  return (
    <section className={styles.wrapper}>
      {/* LEFT */}
      <div className={styles.gallery}>
        <div className={styles.meta}>
          <span>
            Арт: {product.product_id}{" "}
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
            Видеобзор
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

      {/* CENTER */}
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
        <h1 className={styles.productTitle}>{product.name}</h1>
        <p className={styles.productModel}>Модель: {product.model}</p>

        {/* Цены с учетом выбранного offer */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(mainPrice)}</span>
          {oldPrice && oldPrice > mainPrice && (
            <span className={styles.oldPrice}>{formatPrice(oldPrice)}</span>
          )}
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

        {/* ЗАГЛУШКА - оригинальный вариант */}
        <div className={styles.options}>
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
                <span
                  className={styles.colorDot}
                  style={{ background: color.value }}
                />
                <span>{color.name}</span>
                <span
                  className={`${styles.arrow} ${colorOpen ? styles.open : ""}`}
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
                  {[
                    { name: "Бордовый", value: "#7b001c" },
                    { name: "Чёрный", value: "#000000" },
                    { name: "Синий", value: "#0033aa" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className={styles.option}
                      onClick={() => {
                        setColor(item);
                        setColorOpen(false);
                      }}
                    >
                      <div className={styles.optionContent}>
                        <span
                          className={styles.colorDot}
                          style={{ background: item.value }}
                        />
                        <span>{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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
                <span>{size}</span>
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
                  {['14"', '16"', '18"'].map((item) => (
                    <div
                      key={item}
                      className={styles.option}
                      onClick={() => {
                        setSize(item);
                        setSizeOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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
              <span>{qty}</span>
              <button
                onClick={handleIncreaseQty}
                disabled={
                  currentOffer ? qty >= getTotalStock(currentOffer) : false
                }
                className={
                  currentOffer && qty >= getTotalStock(currentOffer)
                    ? styles.disabled
                    : ""
                }
              >
                +
              </button>
            </div>
            {currentOffer && getTotalStock(currentOffer) > 0 && (
              <div className={styles.stockInfo}>
                Доступно: {getTotalStock(currentOffer)} шт.
              </div>
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

        {/* Информация о доступных SKU */}
        {product.offers && product.offers.length > 0 && (
          <div className={styles.skuSection}>
            <h3 className={styles.skuTitle}>Доступные варианты:</h3>

            {/* Если только один вариант без цвета и размера */}
            {product.offers.length === 1 &&
            !product.offers[0].color &&
            !product.offers[0].size ? (
              <div className={styles.singleSku}>
                <div className={styles.skuRowSimple}>
                  <span className={styles.skuLabel}>Артикул:</span>
                  <span className={styles.skuValue}>
                    {product.offers[0].offer_id}
                  </span>
                </div>
                <div className={styles.skuRowSimple}>
                  <span className={styles.skuLabel}>Цена:</span>
                  <span className={styles.skuPrice}>
                    {formatPrice(getMainPrice(product.offers[0]))}
                  </span>
                </div>
                <div className={styles.skuRowSimple}>
                  <span className={styles.skuLabel}>Наличие:</span>
                  <span
                    className={
                      getTotalStock(product.offers[0]) > 0
                        ? styles.inStockSku
                        : styles.outOfStockSku
                    }
                  >
                    {getTotalStock(product.offers[0]) > 0
                      ? `${getTotalStock(product.offers[0])} шт.`
                      : "Нет в наличии"}
                  </span>
                </div>
              </div>
            ) : (
              /* Если несколько вариантов или есть цвет/размер */
              <div className={styles.skuTable}>
                <div className={styles.skuHeader}>
                  <span>№</span>
                  <span>Артикул</span>
                  <span>Цвет</span>
                  <span>Размер</span>
                  <span>Цена</span>
                  <span>Наличие</span>
                </div>
                {product.offers.map((offer, index) => {
                  const offerPrice =
                    offer.prices?.find(
                      (p) => p.type === "price" || p.type_price_id === 1
                    )?.price || 0;
                  const offerStock = getTotalStock(offer);
                  const isCurrent = offer.id === currentOffer?.id;

                  return (
                    <div
                      key={offer.id}
                      className={`${styles.skuRow} ${
                        isCurrent ? styles.currentSku : ""
                      }`}
                    >
                      <span className={styles.skuIndex}>{index + 1}</span>
                      <span className={styles.skuId}>{offer.offer_id}</span>
                      <span>{offer.color || "-"}</span>
                      <span>{offer.size || "-"}</span>
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
            )}

            {/* Информация о складах для текущего SKU */}
            {currentOffer &&
              currentOffer.warehouses &&
              currentOffer.warehouses.length > 0 && (
                <div className={styles.warehouseInfo}>
                  <h4>Наличие на складах:</h4>
                  <div className={styles.warehouseList}>
                    {currentOffer.warehouses.map((warehouse) => (
                      <div
                        key={warehouse.warehouse_id}
                        className={styles.warehouseItem}
                      >
                        <span className={styles.warehouseName}>
                          {warehouse.title}:
                        </span>
                        <span
                          className={
                            warehouse.count > 0
                              ? styles.warehouseInStock
                              : styles.warehouseOutOfStock
                          }
                        >
                          {warehouse.count > 0
                            ? `${warehouse.count} шт.`
                            : "Нет в наличии"}
                        </span>
                      </div>
                    ))}
                    {/* Общее количество */}
                    {getTotalStock(currentOffer) > 0 && (
                      <div className={styles.warehouseTotal}>
                        <span className={styles.warehouseName}>
                          <strong>Итого доступно:</strong>
                        </span>
                        <span className={styles.warehouseInStock}>
                          <strong>{getTotalStock(currentOffer)} шт.</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      {/* RIGHT */}
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

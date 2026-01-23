import React, { useState } from "react";
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

export const DetailHead: React.FC = () => {
  const [active, setActive] = useState(0);
  const [height, setHeight] = useState(175);
  const increase = () => setHeight((prev) => prev + 1);
  const decrease = () => setHeight((prev) => prev - 1);
  const [qty, setQty] = useState(1);
  const [colorOpen, setColorOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [color, setColor] = useState({
    name: "Бордовый",
    value: "#7b001c",
  });
  const [size, setSize] = useState('16"');

  return (
    <section className={styles.wrapper}>
      {/* LEFT */}

      <div className={styles.gallery}>
        <div className={styles.meta}>
          <span>
            Арт: HQ-001456{" "}
            <IconWrapper Icon={BiCopy} style={{ color: "#545454" }} />
          </span>
          <span className={styles.inStock}>
            <IconWrapper Icon={FiCheck} style={{ color: "#2BD53C" }} /> В
            наличии
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
          <img src={images[active]} className={styles.mainImage} />
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
            <img src={welt} alt="" />
            Welt
          </div>
          <span className={styles.warranty}>
            <IconWrapper
              Icon={PiShieldCheckBold}
              style={{ color: "#2BD53C" }}
            />
            Гарантия 2 года
          </span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>54 990 ₽</span>
          <span className={styles.oldPrice}>106 990 ₽</span>
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
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>
        </div>

        <div className={styles.gift}>
          <IconWrapper Icon={PiGift} size={24} style={{ color: "#F34723" }} />+
          Подарок: держатель для бутылки
        </div>

        <div className={styles.actions}>
          <button className={styles.cart}>
            В корзину <IconWrapper size={20} Icon={FiShoppingCart} />
          </button>
          <button className={styles.fav}>
            <IconWrapper Icon={FiHeart} size={24} />
          </button>
          <a className={styles.installment}>Рассрочка в 1 клик</a>
        </div>
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

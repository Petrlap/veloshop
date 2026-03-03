import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardAccessories } from "../../components/CardAccessories/CardAccessories";
import { ConsultationForm } from "../../components/ConsultationForm/ConsultationForm";
import { HiTruck } from "react-icons/hi2";
import {
  FaMapMarkerAlt,
  FaCheck,
  FaRegTrashAlt,
  FaBoxes,
} from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";
import styles from "./Basket.module.css";
import img from "../../assets/deferred/bike.webp";
import img2_1 from "../../assets/accessories/accessories-1.webp";
import img2_2 from "../../assets/accessories/accessories-2.webp";
import img2_3 from "../../assets/accessories/accessories-3.webp";
import img2_4 from "../../assets/accessories/accessories-4.webp";
import img2_5 from "../../assets/accessories/accessories-5.webp";
import { IoPrintOutline } from "react-icons/io5";

type Item = {
  id: number;
  count: number;
  checked: boolean;
  name?: string;
};

const initialItems: Item[] = [
  {
    id: 1,
    count: 1,
    checked: false,
    name: "Женский велосипед Welt Edelweiss 2.0 HD 27 (2024)",
  },
  {
    id: 2,
    count: 1,
    checked: false,
    name: "Женский велосипед Welt Edelweiss 2.0 HD 27 (2024)",
  },
];

export const Basket: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>(initialItems);

  const allChecked = items.length > 0 && items.every((i) => i.checked);

  const toggleAll = () => {
    setItems(items.map((i) => ({ ...i, checked: !allChecked })));
  };

  const toggleOne = (id: number) => {
    setItems(
      items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  };

  const changeCount = (id: number, delta: number) => {
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, count: Math.max(1, i.count + delta) } : i
      )
    );
  };

  const accessories = [
    {
      image: img2_1,
      hit: false,
      sale: false,
      section: "Аксессуары",
      status: "В наличии",
      title: "Багажники",
      price: "4 050",
      oldprice: "",
      pricePerMonth: "от 675 руб. в месяц ",
    },
    {
      image: img2_2,
      hit: false,
      sale: false,
      section: "Аксессуары",
      status: "В наличии",
      title: "Замки",
      price: "1 200",
      oldprice: "",
      pricePerMonth: "от 200 руб. в месяц ",
    },
    {
      image: img2_3,
      hit: false,
      sale: false,
      section: "Аксессуары",
      status: "В наличии",
      title: "Фары",
      price: "3 500",
      oldprice: "",
      pricePerMonth: "от 500 руб. в месяц ",
    },
    {
      image: img2_4,
      hit: false,
      sale: false,
      section: "Аксессуары",
      status: "В наличии",
      title: "Очки",
      price: "600",
      oldprice: "",
      pricePerMonth: "от 100 руб. в месяц ",
    },
    {
      image: img2_5,
      hit: false,
      sale: false,
      section: "Аксессуары",
      status: "В наличии",
      title: "Шлемы",
      price: "2 200",
      oldprice: "",
      pricePerMonth: "от 300 руб. в месяц ",
    },
    {
      image: img2_5,
      hit: false,
      sale: false,
      section: "Аксессуары",
      status: "В наличии",
      title: "Шлемы",
      price: "2 200",
      oldprice: "",
      pricePerMonth: "от 300 руб. в месяц ",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add(styles.activeDrag);
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseUpOrLeave = () => {
      isDown = false;
      el.classList.remove(styles.activeDrag);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onMouseUpOrLeave);
    el.addEventListener("mouseleave", onMouseUpOrLeave);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onMouseUpOrLeave);
      el.removeEventListener("mouseleave", onMouseUpOrLeave);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <section className={styles.basketEmpty}>
        <span className={styles.breadcrubs}>главная / корзина</span>
        <h1>К сожалению, ваша корзина пуста</h1>
        <p>
          Исправить это недоразумение очень просто:{" "}
          <a href="#">выберите в каталоге</a> интересующий товар и нажмите
          кнопку «В корзину».
        </p>
        <button>
          В каталог
          <IconWrapper
            Icon={FaArrowRight}
            size={20}
            style={{ color: "#fff" }}
          />
        </button>
        <ConsultationForm />
      </section>

      <section className={styles.basket}>
        <span className={styles.breadcrubs}>главная / корзина</span>
        <h1>
          Корзина
          <span>{items.length.toString().padStart(2, "0")}</span>
        </h1>

        <div className={styles.content}>
          <div className={styles.list}>
            {/* Header */}
            <div className={styles.listHeader}>
              <label
                className={`${styles.checkbox} ${
                  allChecked ? styles.checked : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                />
                <span className={styles.checkBoxCustom}>
                  {allChecked && (
                    <IconWrapper
                      Icon={FaCheck}
                      size={12}
                      style={{ color: "#F34723" }}
                    />
                  )}
                </span>
                <span>Выбрать все</span>
              </label>
              <div>Осталось 13 дней</div>
            </div>
            <div className={styles.leftBlock}>
              <div className={styles.tabs}>
                <button className={styles.activeTab}>
                  В корзине <span>{items.length}</span>
                </button>
                <button>
                  Доступны для заказа <span>0</span>
                </button>
              </div>
              {/* Items */}
              {items.map((item) => (
                <div className={styles.item} key={item.id}>
                  <label
                    className={`${styles.checkbox} ${
                      item.checked ? styles.checked : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleOne(item.id)}
                    />
                    <span className={styles.checkBoxCustom}>
                      {item.checked && (
                        <IconWrapper
                          Icon={FaCheck}
                          size={12}
                          style={{ color: "#F34723" }}
                        />
                      )}
                    </span>
                  </label>

                  <div className={styles.imageBox}>
                    <img src={img} alt="" className={styles.image} />
                  </div>

                  <div className={styles.info}>
                    <h3>{item.name}</h3>
                    <p>Цвет: Серый</p>
                    <p>Размер: 600ml</p>

                    <div className={styles.actions}>
                      <button>
                        <IconWrapper
                          Icon={FiHeart}
                          size={20}
                          style={{ color: "#000" }}
                        />
                      </button>
                      <button>
                        <IconWrapper
                          Icon={FaRegTrashAlt}
                          size={20}
                          style={{ color: "#000" }}
                        />
                      </button>
                    </div>
                  </div>

                  <div className={styles.price}>
                    <strong>154 990 ₽</strong>
                    <span>166 990 ₽</span>
                    <div className={styles.left}>
                      Осталось {item.id === 1 ? 4 : 1} шт
                    </div>
                  </div>

                  <div className={styles.counter}>
                    <button onClick={() => changeCount(item.id, -1)}>-</button>
                    <span>{item.count}</span>
                    <button onClick={() => changeCount(item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              <IconWrapper
                Icon={HiTruck}
                size={24}
                style={{ color: "#6a6969" }}
              />
              <a>Доставка</a> курьером завтра бесплатно
            </div>
            <div className={styles.sidebarItem}>
              <IconWrapper
                Icon={FaBoxes}
                size={24}
                style={{ color: "#6a6969" }}
              />
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
        </div>

        <section className={styles.cardsLineCont}>
          <div className={styles.cardsHead}>
            <h2 className={styles.title50}>
              Вам <span>может пригодиться</span>
            </h2>
            <button
              onClick={() => navigate("/catalog")}
              className={styles.viewAllButton}
            >
              Смотреть все предложения {">"}
            </button>
          </div>
          <div className={styles.cardsLine} ref={scrollRef}>
            {accessories.map((item, index) => (
              <CardAccessories key={index} {...item} />
            ))}
          </div>
          <button
            onClick={() => navigate("/catalog")}
            className={styles.viewAllButton}
          >
            Смотреть все предложения {">"}
          </button>
        </section>

        <div className={styles.placingOrder}>
          <div className={styles.promoBlock}>
            <h2>Оформление заказа</h2>
            <div className={styles.promoContainer}>
              <input
                type="text"
                placeholder="Промокод:"
                className={styles.promoInput}
              />

              <button type="button" className={styles.promoButton}>
                Применить
              </button>
            </div>
            <div className={styles.printContainer}>
              <div>
                <IconWrapper
                  Icon={IoPrintOutline}
                  size={24}
                  style={{ color: "#6a6969" }}
                />
              </div>{" "}
              Распечатать заказ
            </div>
          </div>
          <div className={styles.deliveryContainer}>
            <p className={styles.deliveryTitle}>Доставка:</p>
            <p>
              <span>Александровск-Сахалинский</span>
            </p>
            <p>
              Пунтк выдачи: <span>Урюпинское водозаборное хранилище</span>
            </p>
            <p className={styles.deliveryPrice}>
              Стоимость доставки: <span>1 099₽</span>
            </p>
          </div>
          <div className={styles.priceContainer}>
            <p className={styles.sum}>
              Итого:<span>301 099₽</span>
            </p>
            <p className={styles.sale}>
              Скидка <span>213 450 ₽</span>
            </p>
            <Link to="/checkout" className={styles.priceContainerLink}>Оформить заказ</Link>
          </div>
        </div>

        <ConsultationForm />
      </section>
    </>
  );
};

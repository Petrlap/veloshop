import { useState } from "react";
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
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";
import styles from "./Deferred.module.css";
import img from "../../assets/deferred/bike.webp";

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

export const Deferred: React.FC = () => {
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

  return (
    <>
      <section className={styles.deferredEmpty}>
        <span className={styles.breadcrubs}>главная / отложенные товары</span>
        <h1>К сожалению, ваша корзина пуста</h1>
        <p>
          Исправить это недоразумение очень просто:{" "}
          <a href="#">выберите в каталоге</a> интересующий товар и нажмите
          кнопку «В корзину».
        </p>
        <button>В каталог</button>
        <ConsultationForm />
      </section>

      <section className={styles.deferred}>
        <span className={styles.breadcrubs}>главная / отложенные товары</span>
        <h1>
          Отложенные товары
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
                  Отложенные <span>{items.length}</span>
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

                  <div className={styles.imageBox}><img src={img} alt="" className={styles.image} /></div>

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

        <ConsultationForm />
      </section>
    </>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaTruck, FaBoxes, FaArrowRight } from "react-icons/fa";
import { BsFillCreditCard2FrontFill, BsCreditCard } from "react-icons/bs";
import { IoPrintOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";
import styles from "./Checkout.module.css";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
  available: number;
}

interface DeliveryMethod {
  id: string;
  name: string;
  price: number;
  days: string;
  description?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: IconType;
  description?: string;
}

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [items] = useState<OrderItem[]>([
    {
      id: 1,
      name: "Женский велосипед Welt Edelweiss 2.0 HD 27 (2024)",
      price: 154990,
      oldPrice: 166990,
      quantity: 1,
      image: "/src/assets/deferred/bike.webp",
      color: "Серый",
      size: "600ml",
      available: 4,
    },
    {
      id: 2,
      name: "Женский велосипед Welt Edelweiss 2.0 HD 27 (2024)",
      price: 154990,
      oldPrice: 166990,
      quantity: 1,
      image: "/src/assets/deferred/bike.webp",
      color: "Серый",
      size: "600ml",
      available: 1,
    },
  ]);

  const [deliveryMethods] = useState<DeliveryMethod[]>([
    {
      id: "pickup",
      name: "Самовывоз из магазина",
      price: 0,
      days: "сегодня",
      description: "г. Москва, ул. Тверская, 15",
    },
    {
      id: "courier",
      name: "Курьером",
      price: 299,
      days: "завтра",
      description: "Доставка до двери",
    },
    {
      id: "pickup-point",
      name: "Пункт выдачи",
      price: 0,
      days: "послезавтра",
      description: "Урюпинское водозаборное хранилище",
    },
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card-online",
      name: "Картой онлайн",
      icon: BsCreditCard,
      description: "Visa, Mastercard, МИР",
    },
    {
      id: "cash",
      name: "Наличными",
      icon: BsFillCreditCard2FrontFill,
      description: "При получении",
    },
    {
      id: "card-delivery",
      name: "Картой при получении",
      icon: BsCreditCard,
      description: "Терминал у курьера",
    },
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState("pickup");
  const [selectedPayment, setSelectedPayment] = useState("card-online");
  const [comment, setComment] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    floor: "",
    intercom: "",
  });

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateOldTotal = () => {
    return items.reduce(
      (sum, item) => sum + (item.oldPrice || item.price) * item.quantity,
      0
    );
  };

  const calculateDiscount = () => {
    return calculateOldTotal() - calculateSubtotal();
  };

  const getDeliveryPrice = () => {
    const method = deliveryMethods.find((m) => m.id === selectedDelivery);
    return method?.price || 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + getDeliveryPrice();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className={styles.stepIndicator}>
        {/* Шаг 1: Корзина */}
        <div className={`${styles.step} ${styles.completed}`}>
          <span className={styles.stepNumber}>
            <IconWrapper
              Icon={BsFillCreditCard2FrontFill}
              size={16}
              style={{ color: "#fff" }}
            />
          </span>
          <span className={styles.stepLabel}>Корзина</span>
        </div>

        <div className={`${styles.stepLine} ${styles.active}`}></div>

        {/* Шаг 2: Оформление - зависит от step (1,2,3) */}
        <div
          className={`${styles.step} ${step >= 2 ? styles.active : ""} ${
            step > 2 ? styles.completed : ""
          }`}
        >
          <span className={styles.stepNumber}>
            {step > 2 ? (
              <IconWrapper
                Icon={BsFillCreditCard2FrontFill}
                size={16}
                style={{ color: "#fff" }}
              />
            ) : (
              2
            )}
          </span>
          <span className={styles.stepLabel}>Оформление</span>
        </div>

        <div
          className={`${styles.stepLine} ${step > 2 ? styles.active : ""}`}
        ></div>

        {/* Шаг 3: Завершение */}
        <div className={`${styles.step} ${step >= 3 ? styles.active : ""}`}>
          <span className={styles.stepNumber}>3</span>
          <span className={styles.stepLabel}>Завершение</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.checkoutContainer}>
        <span className={styles.breadcrumbs}>
          главная / корзина / оформление заказа
        </span>

        <div className={styles.checkoutHeader}>
          <h1 className={styles.checkoutTitle}>Оформление заказа</h1>
          {renderStepIndicator()}
        </div>

        <div className={styles.checkoutContent}>
          <div className={styles.mainColumn}>
            {/* Шаг 1: Контактные данные */}
            <div className={styles.checkoutSection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>1</span>
                Контактные данные
              </h2>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">Имя *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Введите имя"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Фамилия</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Введите фамилию"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (___) ___-__-__"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@mail.ru"
                    className={styles.formInput}
                  />
                </div>
              </div>
            </div>

            {/* Шаг 2: Способ доставки */}
            <div className={styles.checkoutSection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>2</span>
                Способ доставки
              </h2>

              <div className={styles.deliveryMethods}>
                {deliveryMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`${styles.deliveryMethod} ${
                      selectedDelivery === method.id ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={method.id}
                      checked={selectedDelivery === method.id}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className={styles.deliveryRadio}
                    />
                    <span className={styles.deliveryRadioCustom}>
                      {selectedDelivery === method.id && (
                        <IconWrapper
                          Icon={BsFillCreditCard2FrontFill}
                          size={12}
                          style={{ color: "#f34723" }}
                        />
                      )}
                    </span>

                    <div className={styles.deliveryInfo}>
                      <div className={styles.deliveryName}>
                        {method.name}
                        {method.price === 0 && (
                          <span className={styles.deliveryFree}>Бесплатно</span>
                        )}
                      </div>
                      <div className={styles.deliveryDetails}>
                        {method.description && (
                          <span className={styles.deliveryDescription}>
                            {method.description}
                          </span>
                        )}
                        <span className={styles.deliveryTime}>
                          Срок: {method.days}
                        </span>
                      </div>
                    </div>

                    <div className={styles.deliveryPrice}>
                      {method.price > 0
                        ? `${method.price.toLocaleString()} ₽`
                        : "0 ₽"}
                    </div>
                  </label>
                ))}
              </div>

              {selectedDelivery === "pickup-point" && (
                <div className={styles.pickupMap}>
                  <div className={styles.pickupAddress}>
                    <IconWrapper
                      Icon={FaMapMarkerAlt}
                      size={20}
                      style={{ color: "#f34723" }}
                    />
                    <div>
                      <p>Урюпинское водозаборное хранилище</p>
                      <span>г. Урюпинск, ул. Ленина, д. 15</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedDelivery === "courier" && (
                <div className={styles.addressForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="address">Адрес доставки *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Улица, дом, корпус"
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.addressDetails}>
                    <div className={styles.formGroup}>
                      <label htmlFor="apartment">Квартира/офис</label>
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        placeholder="№"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="floor">Этаж</label>
                      <input
                        type="text"
                        id="floor"
                        name="floor"
                        value={formData.floor}
                        onChange={handleInputChange}
                        placeholder="Этаж"
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="intercom">Домофон</label>
                      <input
                        type="text"
                        id="intercom"
                        name="intercom"
                        value={formData.intercom}
                        onChange={handleInputChange}
                        placeholder="Код"
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Шаг 3: Способ оплаты */}
            <div className={styles.checkoutSection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>3</span>
                Способ оплаты
              </h2>

              <div className={styles.paymentMethods}>
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`${styles.paymentMethod} ${
                      selectedPayment === method.id ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className={styles.paymentRadio}
                    />
                    <span className={styles.paymentRadioCustom}>
                      {selectedPayment === method.id && (
                        <IconWrapper
                          Icon={BsFillCreditCard2FrontFill}
                          size={12}
                          style={{ color: "#f34723" }}
                        />
                      )}
                    </span>

                    <div className={styles.paymentIcon}>
                      <IconWrapper
                        Icon={method.icon}
                        size={24}
                        style={{ color: "#666" }}
                      />
                    </div>

                    <div className={styles.paymentInfo}>
                      <div className={styles.paymentName}>{method.name}</div>
                      {method.description && (
                        <div className={styles.paymentDescription}>
                          {method.description}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Комментарий к заказу */}
            <div className={styles.checkoutSection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>4</span>
                Комментарий к заказу
              </h2>

              <div className={styles.commentBlock}>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Здесь вы можете указать дополнительную информацию к заказу"
                  className={styles.commentInput}
                  rows={4}
                />
              </div>

              <div className={styles.printContainer}>
                <IconWrapper
                  Icon={IoPrintOutline}
                  size={24}
                  style={{ color: "#6a6969" }}
                />
                <span>Распечатать заказ</span>
              </div>
            </div>

            {/* Кнопки навигации */}
            <div className={styles.navigationButtons}>
              <button
                className={styles.backButton}
                onClick={() => navigate("/basket")}
              >
                Вернуться в корзину
              </button>
              <button className={styles.continueButton}>
                Подтвердить заказ
                <IconWrapper
                  Icon={FaArrowRight}
                  size={16}
                  style={{ color: "#fff" }}
                />
              </button>
            </div>
          </div>

          {/* Боковая колонка с заказом */}
          <div className={styles.orderSidebar}>
            <div className={styles.orderSummary}>
              <h3>Ваш заказ</h3>

              <div className={styles.orderItems}>
                {items.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
                    <div className={styles.orderItemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.orderItemInfo}>
                      <div className={styles.orderItemName}>{item.name}</div>
                      <div className={styles.orderItemDetails}>
                        {item.color}, {item.size}
                      </div>
                      <div className={styles.orderItemQuantity}>
                        {item.quantity} × {item.price.toLocaleString()} ₽
                      </div>
                    </div>
                    <div className={styles.orderItemPrice}>
                      {(item.price * item.quantity).toLocaleString()} ₽
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.promoBlock}>
                <div className={styles.promoContainer}>
                  <input
                    type="text"
                    placeholder="Промокод"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={styles.promoInput}
                    disabled={promoApplied}
                  />
                  <button
                    type="button"
                    className={styles.promoButton}
                    onClick={applyPromoCode}
                    disabled={promoApplied}
                  >
                    {promoApplied ? "Применен" : "Применить"}
                  </button>
                </div>
              </div>

              <div className={styles.priceBreakdown}>
                <div className={styles.priceRow}>
                  <span>Товары ({items.length})</span>
                  <span>{calculateSubtotal().toLocaleString()} ₽</span>
                </div>

                {calculateDiscount() > 0 && (
                  <div className={`${styles.priceRow} ${styles.discountRow}`}>
                    <span>Скидка</span>
                    <span>- {calculateDiscount().toLocaleString()} ₽</span>
                  </div>
                )}

                <div className={styles.priceRow}>
                  <span>Доставка</span>
                  <span>{getDeliveryPrice().toLocaleString()} ₽</span>
                </div>

                <div className={`${styles.priceRow} ${styles.totalRow}`}>
                  <span>Итого</span>
                  <span>{calculateTotal().toLocaleString()} ₽</span>
                </div>

                <div className={styles.savingsInfo}>
                  <span className={styles.savingsIcon}>ℹ️</span>
                  <span>
                    Вы экономите {calculateDiscount().toLocaleString()} ₽
                  </span>
                </div>
              </div>

              <div className={styles.orderActions}>
                <button className={styles.placeOrderButton}>
                  Оформить заказ
                </button>
                <p className={styles.agreement}>
                  Нажимая кнопку «Оформить заказ», я соглашаюсь с условиями
                  <a href="/terms"> публичной оферты</a> и
                  <a href="/privacy"> политики обработки персональных данных</a>
                </p>
              </div>
            </div>

            {/* Информационные блоки */}
            <div className={styles.infoSidebar}>
              <div className={styles.infoItem}>
                <IconWrapper
                  Icon={FaMapMarkerAlt}
                  size={20}
                  style={{ color: "#6a6969" }}
                />
                <a href="/stores">Забрать из магазина</a> сегодня
              </div>
              <div className={styles.infoItem}>
                <IconWrapper
                  Icon={FaTruck}
                  size={20}
                  style={{ color: "#6a6969" }}
                />
                <a href="/delivery">Доставка</a> курьером завтра бесплатно
              </div>
              <div className={styles.infoItem}>
                <IconWrapper
                  Icon={FaBoxes}
                  size={20}
                  style={{ color: "#6a6969" }}
                />
                <a href="/pickup">Где купить</a>
              </div>
              <div className={styles.infoItem}>
                <IconWrapper
                  Icon={BsFillCreditCard2FrontFill}
                  size={20}
                  style={{ color: "#6a6969" }}
                />
                <a href="/payment">Как оплатить</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

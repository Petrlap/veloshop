import React, { useState } from "react";
import { Card } from "../../components/Card/Card";
import { CardAccessories } from "../../components/CardAccessories/CardAccessories";
import styles from "./ProductDetail.module.css";
import imgMini from "../../assets/mini.webp";
import better from "../../assets/better.webp";
import img1 from "../../assets/homepage/bike.webp";
import img2 from "../../assets/homepage/bike.webp";
import img3 from "../../assets/homepage/bike.webp";
import img4 from "../../assets/homepage/bike.webp";
import img5 from "../../assets/homepage/bike.webp";
import img2_1 from "../../assets/accessories/accessories-1.webp";
import img2_2 from "../../assets/accessories/accessories-2.webp";
import img2_3 from "../../assets/accessories/accessories-3.webp";
import img2_4 from "../../assets/accessories/accessories-4.webp";
import img2_5 from "../../assets/accessories/accessories-5.webp";
import { OurStores } from "../../components/OurStores/OurStores";
import { MiniCard } from "../../components/MiniCard/MiniCard";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";
import { GoPackageDependents } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoBuildOutline } from "react-icons/io5";
import { MdOutlinePedalBike } from "react-icons/md";
import { LuCircleChevronDown, LuCircleChevronUp } from "react-icons/lu";
import { UNSAFE_getTurboStreamSingleFetchDataStrategy } from "react-router-dom";

type Question = {
  id: number;
  question: string;
  answer: React.ReactNode;
};

const faqData: Question[] = [
  {
    id: 1,
    question: "Как выбрать правильный размер рамы?",
    answer:
      "При выборе рамы важно учесть свой рост, длину ног и предполагаемый стиль катания. Обычно производители указывают рекомендации по росту для каждой модели, но если возникли сомнения, лучше уточнить в сервис-центре магазина или обратиться к консультанту. Для горных велосипедов и самокатов также имеет значение тип подвески и размер колёс — чем выше предполагаемая нагрузка, тем важнее подобрать надёжную конструкцию.",
  },
  {
    id: 2,
    question: "Можно ли заказать велосипед в другой город?",
    answer:
      "Да, большинство интернет-магазинов, в том числе «ВелоШоп», отправляют велосипеды и самокаты по всей России. При оформлении заказа достаточно указать свой регион и способ доставки. Если вы хотите получить товар в собранном виде, стоит уточнить условия: некоторые модели доставляют в частично разобранном состоянии, чтобы избежать повреждений в пути.",
  },
  {
    id: 3,
    question: "Какие гарантии даёт магазин?",
    answer:
      "Обычно на велосипеды и самокаты распространяется официальная гарантия производителя, которая покрывает заводской брак и механические неисправности при правильной эксплуатации. В «ВелоШоп» дополнительно предусмотрены консультации по настройке и обслуживанию. Перед покупкой уточните срок гарантии для конкретной модели и возможен ли бесплатный ремонт в авторизованном сервисном центре.",
  },
  {
    id: 4,
    question: "Предоставляется ли сборка и настройка велосипеда?",
    answer:
      "Большинство магазинов предлагают услугу полной или частичной сборки. Если вы хотите получить велосипед, готовый к поездке, рекомендуется оформить заказ с дополнительной настройкой. В этом случае вам может потребоваться только установить руль и педали после доставки. Уточните, есть ли в вашем городе пункт самовывоза, где велосипед сразу выдают в полностью рабочем состоянии.",
  },
  {
    id: 5,
    question: "Что делать, если модель не подошла по росту?",
    answer:
      "Если после нескольких пробных поездок вы понимаете, что рама велика или мала, возможно оформить возврат или обмен по правилам, установленным в магазине. Обычно у покупателя есть 14 дней (или иной срок, указанный в политике возвратов) с момента получения товара. Важно, чтобы велосипед оставался в товарном виде без серьёзных следов использования.",
  },
  {
    id: 6,
    question: "Можно ли купить велосипед в рассрочку?",
    answer:
      "Да, многие магазины сотрудничают с банками и предлагают различные программы рассрочки или кредита. В «ВелоШоп» можно оформить оплату частями без переплаты на короткий срок или выбрать более длительный период с небольшими процентами. При оформлении рассрочки убедитесь, что у вас есть все необходимые документы (паспорт, иногда СНИЛС) и подтверждение дохода, если это того требует банк.",
  },
  {
    id: 7,
    question: "Как оформить возврат или обмен?",
    answer:
      "Если модель оказалась неподходящей по каким-то причинам, нужно связаться со службой поддержки магазина и уточнить условия возврата. Как правило, для обмена или возврата требуется сохранить товарный вид: отсутствие царапин, грязи, повреждений. После согласования с менеджером велосипед либо отправляют обратно курьерской службой, либо сдают в офлайн-точку. Точные сроки и условия зависят от внутренней политики магазина и действующего законодательства.",
  },
  {
    id: 8,
    question: "Где найти запчасти и аксессуары к выбранной модели?",
    answer:
      "Чаще всего запчасти, колёса, корзины, держатели бутылок и другие аксессуары для выбранной модели доступны в том же интернет-магазине. Если же нужная деталь отсутствует, менеджеры помогут подобрать аналог или сделать предзаказ у производителя. Так вы сможете быть уверены, что получите совместимые комплектующие без долгих поисков по сторонним площадкам.",
  },
];

export const ProductDetail: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const news = [
    {
      image: img1,
      hit: true,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img2,
      hit: true,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img3,
      hit: false,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img4,
      hit: false,
      sale: false,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
    {
      image: img5,
      hit: false,
      sale: true,
      section: "Велосипеды",
      status: "В наличии",
      title: "Stark Krafter 29.8 HD (2025) велосипед",
      price: "41 050",
      oldprice: "82 100",
      pricePerMonth: "от 2 675 руб. в месяц",
    },
  ];
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
  ];
  const minicard = [
    {
      image: imgMini,
      year: "2024",
      sale: "23%",
      title: "Женский велосипед Welt Edelweiss 2.0 HD27...",
    },
  ];
  return (
    <>
      <span className={styles.breadcrubs}>
        главная / каталог / велосипеды / горные /{" "}
      </span>
      <h1>Женский велосипед Welt Edelweiss 2.0 HD 27 (2024)</h1>

      <section className={styles.cardsLineCont}>
        <div className={styles.cardsHead}>
          <h2>
            С этим товаром <span>покупают</span>
          </h2>
          <a href="#">Смотреть все предложения {">"}</a>
        </div>
        <div className={styles.cardsLine}>
          {accessories.map((item, index) => (
            <CardAccessories key={index} {...item} />
          ))}
          {minicard.map((item, index) => (
            <MiniCard key={index} {...item} />
          ))}
        </div>
        <a href="#">Смотреть все предложения {">"}</a>
      </section>
      <section className={styles.cardsLineCont}>
        <div className={styles.cardsHead}>
          <h2>
            <span>Новинки</span> 2025
          </h2>
          <a href="#">Смотреть все предложения {">"}</a>
        </div>
        <div className={styles.cardsLine}>
          {news.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
        <a href="#">Смотреть все предложения {">"}</a>
      </section>
      <section
        className={`${styles.cardsLineCont} ${styles.better}`}
        style={{ position: "relative" }}
      >
        <div className={styles.cardsHead}>
          <h2>
            Почему <span>у нас лучше</span>
          </h2>
        </div>
        <div className={styles.betterBlock}>
          <div className={styles.betterCards}>
            <div className={styles.betterCard}>
              <div>
                <IconWrapper
                  Icon={GoPackageDependents}
                  size={40}
                  style={{ color: "#F34723" }}
                />
              </div>
              <p>Бесплатная доставка</p>
            </div>
            <div className={styles.betterCard}>
              <div>
                <IconWrapper
                  Icon={IoMdCheckmarkCircleOutline}
                  size={40}
                  style={{ color: "#F34723" }}
                />
              </div>
              <p>Официальная гарантия 1 год</p>
            </div>
            <div className={styles.betterCard}>
              <div>
                <IconWrapper
                  Icon={FaChalkboardUser}
                  size={40}
                  style={{ color: "#F34723" }}
                />
              </div>
              <p>Сертифицированный дилер</p>
            </div>
            <div className={styles.betterCardWB}>
              <div>
                <IconWrapper
                  Icon={IoBuildOutline}
                  size={40}
                  style={{ color: "#F34723" }}
                />
              </div>
              <p>
                Не нужно мучиться с инструментом: прикрутите только руль педали
                и колесо
              </p>
            </div>
          </div>
          <div className={styles.betterModal}>
            <div className={styles.betterModalText}>
              <div>
                <IconWrapper
                  Icon={MdOutlinePedalBike}
                  size={40}
                  style={{ color: "#F34723" }}
                />
              </div>
              <p>
                Велосипед приедет уже <span>собранным на 80%</span>
              </p>
            </div>
            <img src={better} alt="" />
          </div>
        </div>
        <div className={styles.miniCard}>
          {minicard.map((item, index) => (
            <MiniCard key={index} {...item} />
          ))}
        </div>
      </section>
      <section
        className={`${styles.cardsLineCont} ${styles.faq}`}
        style={{ position: "relative" }}
      >
        <div className={styles.cardsHead}>
          <h2>
            Вопросы <span>ответы</span>
          </h2>
        </div>
        <div className={styles.faqList}>
          {faqData.map(({ id, question, answer }) => (
            <div key={id} className={styles.item}>
              <button className={styles.header} onClick={() => toggle(id)}>
                <span>
                  {id}. {question}
                </span>
                {openId === id ? (
                  <IconWrapper
                    Icon={LuCircleChevronUp}
                    className={styles.icon}
                  />
                ) : (
                  <IconWrapper
                    Icon={LuCircleChevronDown}
                    className={styles.icon}
                  />
                )}
              </button>
              <div
                className={`${styles.content} ${
                  openId === id ? styles.open : ""
                }`}
              >
                {answer}
              </div>
            </div>
          ))}
          <div className={styles.miniCard}>
            {minicard.map((item, index) => (
              <MiniCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
      <OurStores />
    </>
  );
};

import React from "react";
import styles from "./Assembly.module.css";
import { IoArrowForward } from "react-icons/io5";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import assembly from "../../assets/assembly.webp";
import imgMini from "../../assets/mini.webp";
import { MiniCard } from "../../components/MiniCard/MiniCard";

export const Assembly: React.FC = () => {
  const minicard = [
    {
      image: imgMini,
      year: "2024",
      sale: "23%",
      title: "Женский велосипед Welt Edelweiss 2.0 HD27...",
    },
  ];
  return (
    <section className={styles.assembly}>
      <h2>
        Услуги <span>сборки</span>
      </h2>
      <div className={styles.whiteBlock}>
        <div className={styles.textBlock}>
          <div className={styles.leftText}>
            <div>
              <p className={styles.title}>Идеальная настройка</p>
              <p>
                Мы выставим тормоза, переключатели скоростей и подвеску по всем
                стандартам завода-изготовителя, чтобы вы ощутили комфорт уже с
                первых минут катания.
              </p>
            </div>
            <div>
              <p className={styles.title}>Гарантия безопасности</p>
              <p>
                Все узлы и крепления будут проверены дважды: от затяжки болтов
                до натяжения цепи. Вы получите транспортное средство, готовое к
                полноценной и безопасной эксплуатации.
              </p>
            </div>
            <div>
              <p className={styles.title}>Экономия времени</p>
              <p>
                Вам не придётся искать инструменты и смотреть видеоинструкции.
                Велосипед приедет практически «под ключ»: останется лишь
                поставить педали и, при необходимости, повернуть руль.
              </p>
            </div>
            <div>
              <p className={styles.title}>Личные рекомендации</p>
              <p>
                При желании наши специалисты подскажут, как ухаживать за
                моделью: от регулярной смазки до правильного хранения зимой,
                чтобы техника служила годами.
              </p>
            </div>
          </div>
          <img src={assembly} alt="" />
        </div>
        <h2>
          Как это <span>работает?</span>
        </h2>
        <div className={styles.bottomBlock}>
          <div>
            <p className={styles.title}>
              Вы оформляете услугу сборки при заказе
              <IconWrapper
                Icon={IoArrowForward}
                size={24}
                style={{ color: "#F34723" }}
              />
            </p>
            <p>
              Отметьте опцию «Профессиональная сборка» в корзине или сообщите
              менеджеру по телефону.
            </p>
          </div>
          <div>
            <p className={styles.title}>
              Мастера настраивают велосипед
              <IconWrapper
                Icon={IoArrowForward}
                size={24}
                style={{ color: "#F34723" }}
              />
            </p>
            <p>
              Мы аккуратно упакуем его, чтобы при доставке не возникло
              повреждений.
            </p>
          </div>
          <div>
            <p className={styles.title}>
              Получаете готовый к поездке транспорт
              <IconWrapper
                Icon={IoArrowForward}
                size={24}
                style={{ color: "#F34723" }}
              />
            </p>
            <p>
              Доставка курьером или в пункт самовывоза. Вам достаточно снять
              защитную плёнку, установить педали и можно ехать!
            </p>
          </div>
        </div>
      </div>
      <div className={styles.miniCard}>
        {minicard.map((item, index) => (
          <MiniCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

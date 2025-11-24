import React, { useState } from "react";
import { RiBikeLine } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./Quiz.module.css";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import img from "../../assets/bg.webp";

const totalSteps = 3;

export const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const progressMap = [3, 53, 100];
  const progress = progressMap[step];
  return (
    <section className={styles.quiz}>
      <div className={styles.quizHead}>
        <h2>
          Собери свой идеальный велосипед <span>за 3 шага!</span>
        </h2>
        <a href="#">Подобрать велосипед {">"}</a>
      </div>
      <div className={styles.quizWrapper}>
        <div className={styles.quizCard}>
          <header className={styles.quizHeader}>
            <h3 className={styles.title}>
              Шаг {step + 1}:&nbsp;
              {step === 0 && "Выберите тип велосипеда"}
              {step === 1 && "Укажите бюджет"}
              {step === 2 && "Выберите желаемые характеристики"}
            </h3>
          </header>

          <div className={styles.quizMiddle}>
            {/* slider with three slides */}
            <div
              className={styles.slides}
              style={{ transform: `translateX(-${step * 100}%)` }}
            >
              {/* Step 1 - types */}
              <div className={styles.slide}>
                <div className={styles.cardsRow}>
                  {[
                    { title: "Горный велосипед" },
                    { title: "Городской велосипед" },
                    { title: "Складной велосипед" },
                    { title: "Пока не знаю" },
                  ].map((c, i) => (
                    <div key={i} className={styles.card}>
                      <div className={styles.cardThumb} />
                      <div className={styles.cardTitle}>{c.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2 - budget */}
              <div className={styles.slide}>
                <div className={styles.optionsRow}>
                  {[
                    "До 20 000 ₽",
                    "20 000 — 50 000 ₽",
                    "50 000 — 100 000 ₽",
                    "Больше 100 000 ₽",
                  ].map((opt, i) => (
                    <button key={i} className={styles.optionBtn}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3 - characteristics */}
              <div className={styles.slide}>
                <div className={styles.featuresGrid}>
                  {[
                    "Амортизация",
                    "Лёгкая рама",
                    "Гидравлические тормоза",
                    "Длина пробега",
                  ].map((f, i) => (
                    <label key={i} className={styles.featureItem}>
                      <input type="checkbox" />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          {/* progress */}
          <div className={styles.progressWrap}>
            <div className={styles.progressText}>
              Готово <span>{progress - 3 === 97 ? 100 : progress - 3}%</span>
            </div>
            <div className={styles.progressLine}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
              <div
                className={styles.bikeIcon}
                style={{ left: `calc(${progress}% - 12px)` }}
                aria-hidden
              >
                <IconWrapper Icon={RiBikeLine} size={24} />
              </div>
            </div>

            <div className={styles.controls}>
              <button
                onClick={prev}
                className={styles.btn}
                disabled={step === 0}
                aria-label="Назад"
              >
                <IconWrapper Icon={IoIosArrowRoundBack} size={24} />
              </button>
              <button
                onClick={next}
                className={styles.btnPrimary}
                disabled={step === totalSteps - 1}
                aria-label="Далее"
              >
                Подробнее {">"}
              </button>
            </div>
          </div>

          {/* controls */}
        </div>
      </div>
      <div className={styles.quizBottom}>
        <div className={styles.textBlock}>
          <h2>
            Мастерская <span>в твоем городе</span>
          </h2>
          <p>Поможем отремонтировать ваш велосипед быстро и не дорого.</p>
          <button>Узнать прайс лист {" >"}</button>
        </div>
        <div className={styles.imageBox}>
          <img src={img} alt="Image 1" />
          <img src={img} alt="Image 2" />
        </div>
      </div>
    </section>
  );
};

import React, { useState } from "react";
import { RiBikeLine } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./Quiz.module.css";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import img from "../../assets/bg.webp";
import bikeIcon from "../../assets/quiz/bikeIcon.webp";
import img1 from "../../assets/quiz/image-1.webp";
import img2 from "../../assets/quiz/image-2.webp";
import cardThumb1 from "../../assets/quiz/cardthumb-1.webp";
import cardThumb2 from "../../assets/quiz/cardthumb-2.webp";
import cardThumb3 from "../../assets/quiz/cardthumb-3.webp";
import cardThumb4 from "../../assets/quiz/cardthumb-4.webp";

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
                    { title: "Горный велосипед", cardThumb: cardThumb1 },
                    { title: "Городской велосипед", cardThumb: cardThumb2 },
                    { title: "Складной велосипед", cardThumb: cardThumb3 },
                    { title: "Пока не знаю", cardThumb: cardThumb4 },
                  ].map((c, i) => (
                    <div key={i} className={styles.card}>
                      <img
                        src={c.cardThumb}
                        className={styles.cardThumb}
                        alt=""
                      />
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
                <img src={bikeIcon} alt="Icon bike" />
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
          <img src={img1} alt="Image 1" />
          <img src={img2} alt="Image 2" />
        </div>
      </div>
    </section>
  );
};

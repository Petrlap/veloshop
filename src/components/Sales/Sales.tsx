import React, { useState, useEffect, useRef } from "react";
import styles from "./Sales.module.css";
import imgSale from "../../assets/imgSale.webp";
import img1 from "../../assets/sales/sale-1.webp";
import img2 from "../../assets/sales/sale-2.webp";
import img3 from "../../assets/sales/sale-1.webp";
import img4 from "../../assets/sales/sale-2.webp";
import img5 from "../../assets/sales/sale-1.webp";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { IconWrapper } from "../IconWrapper/IconWrapper";

const slides = [img1, img2, img3, img4, img5];

export const Sales: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const transitionMs = 400;

  useEffect(() => {
    const updateVisible = () => {
      setVisibleCount(window.innerWidth < 600 ? 1 : 3);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  useEffect(() => {
    const calc = () => {
      if (!slideRef.current) return;
      const slideRect = slideRef.current.getBoundingClientRect();
      const gap = 20;
      setSlideWidth(Math.round(slideRect.width + gap));
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (slideRef.current) ro.observe(slideRef.current);
    return () => ro.disconnect();
  }, [visibleCount]);

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const pad = Math.floor(visibleCount / 2);
  const paddedSlides = [
    ...Array(pad).fill(null),
    ...slides,
    ...Array(pad).fill(null),
  ];

  const translateX = -index * slideWidth;

  return (
    <section className={styles.sales}>
      <h2>
        <span>Акции</span> <a href="#">Смотреть все предложения {">"}</a>
      </h2>

      <div className={styles.salesCont}>
        <div className={styles.textBlock}>
          <div className={styles.leftBackground}>
            <img src={imgSale} alt="" />
          </div>
          <p>
            Текст акции в несколько строк Текст акции в несколько строкТекст
            акции в несколько строкТекст акции в несколько строк.
          </p>
        </div>

        <div className={styles.salesBox}>
          <div className={styles.head}>
            <button
              onClick={handlePrev}
              className={styles.navBtn}
              disabled={index === 0}
            >
              <IconWrapper Icon={RiArrowLeftWideFill} size={24} />
            </button>

            <div className={styles.slider}>
              <div
                ref={trackRef}
                className={styles.track}
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: `transform ${transitionMs}ms ease`,
                }}
              >
                {paddedSlides.map((img, i) => {
                  if (!img)
                    return <div key={`pad-${i}`} className={styles.slide} />;
                  const isActive = i - pad === index;
                  return (
                    <div
                      key={i}
                      ref={i === pad ? slideRef : undefined}
                      className={`${styles.slide} ${
                        isActive ? styles.active : ""
                      }`}
                    >
                      <img src={img} alt={`slide-${i}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Индикатор слайда */}
            <div className={styles.slideCounter}>
              <span className={styles.activeS}>
                {String(index + 1).padStart(2, "0")}
              </span>{" "}
              <span className={styles.line}>/</span>{" "}
              <span className={styles.disableS}>
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <button
              onClick={handleNext}
              className={styles.navBtn}
              disabled={index === slides.length - 1}
            >
              <IconWrapper Icon={RiArrowRightWideFill} size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

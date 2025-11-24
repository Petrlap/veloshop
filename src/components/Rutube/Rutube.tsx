import React, { useState, useEffect } from "react";
import styles from "./Rutube.module.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import img1 from "../../assets/bg.webp";
import img2 from "../../assets/bg.webp";
import img3 from "../../assets/bg.webp";
import img4 from "../../assets/bg.webp";
import img5 from "../../assets/bg.webp";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { FaYoutube } from "react-icons/fa";

const videos = [
  {
    image: img1,
    iframe: "https://rutube.ru/play/embed/a0f80d3ab27a24827ad39fbf0e89852d/",
  },
  {
    image: img2,
    iframe: "https://rutube.ru/play/embed/a0f80d3ab27a24827ad39fbf0e89852d/",
  },
  {
    image: img3,
    iframe: "https://rutube.ru/play/embed/a0f80d3ab27a24827ad39fbf0e89852d/",
  },
  {
    image: img4,
    iframe: "https://rutube.ru/play/embed/a0f80d3ab27a24827ad39fbf0e89852d/",
  },
  {
    image: img5,
    iframe: "https://rutube.ru/play/embed/a0f80d3ab27a24827ad39fbf0e89852d/",
  },
];

export const Rutube: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 600) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);
  const maxIndex = videos.length - visibleCount;

  const handlePrev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <section className={styles.rutube}>
      <div className={styles.head}>
        <h2>Велошоп на Рутуб</h2>
        <div className={styles.buttons}>
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className={`${styles.navBtn} ${index === 0 ? styles.disabled : ""}`}
          >
            <IconWrapper Icon={HiChevronLeft} size={24} />
          </button>
          <button
            onClick={handleNext}
            disabled={index === maxIndex}
            className={`${styles.navBtn} ${
              index === maxIndex ? styles.disabled : ""
            }`}
          >
            <IconWrapper Icon={HiChevronRight} size={24} />
          </button>
        </div>
        <div className={styles.line}></div>
        <a href="#">Смотреть все предложения {">"}</a>
      </div>

      <p className={styles.subtitle}>
        Подписывайтесь, комментируйте, участвуйте в розыгрышах!
      </p>

      <div className={styles.slider}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
        >
          {videos.map((video, i) => (
            <div key={i} className={styles.slide}>
              {activeVideo === video.iframe ? (
                <iframe
                  width="100%"
                  height="200"
                  src={video.iframe}
                  style={{ border: "none", borderRadius: "10px" }}
                  allow="clipboard-write; autoplay"
                  allowFullScreen
                ></iframe>
              ) : (
                <div
                  className={styles.preview}
                  onClick={() => setActiveVideo(video.iframe)}
                >
                  <img src={video.image} alt={`video-${i}`} />
                  <div className={styles.playBtn}>
                    <IconWrapper
                      Icon={FaYoutube}
                      size={60}
                      style={{ color: "#1D93D2" }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <a href="#">Смотреть все предложения {">"}</a>
      </div>
    </section>
  );
};

import React, { useRef } from "react";
import styles from "./BannerBlock.module.css";
import img from "../../assets/banners/banner.webp";
import minibanner1 from "../../assets/banners/minibanner-1.webp";
import minibanner2 from "../../assets/banners/minibanner-2.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const BannerBlock: React.FC = () => {
  const images = [img, img, img];
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.bannerBlock}>
      <h1>
        <span>Интернет-магазин</span> велосипедов Москва
      </h1>
      <div className={styles.banners}>
        <div className={styles.bannersBlock}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop
            onBeforeInit={(swiper: SwiperType) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean" &&
                prevRef.current &&
                nextRef.current
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
              if (
                swiper.params.pagination &&
                typeof swiper.params.pagination !== "boolean" &&
                paginationRef.current
              ) {
                swiper.params.pagination.el = paginationRef.current;
                swiper.params.pagination.clickable = true;
              }
            }}
            className={styles.swiper}
          >
            {images.map((imgSrc, index) => (
              <SwiperSlide key={index} className={styles.bannerSlide}>
                <img
                  src={imgSrc}
                  alt={`Banner ${index + 1}`}
                  className={styles.bannerImg}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.nav}>
            <button ref={prevRef} className={styles.prevBtn}>
              <IconWrapper
                Icon={IoMdArrowBack}
                size={20}
                style={{
                  color: "#fff",
                }}
              />
            </button>
            <div ref={paginationRef} className={styles.pagination}></div>
            <button ref={nextRef} className={styles.nextBtn}>
              <IconWrapper
                Icon={IoMdArrowForward}
                size={20}
                style={{
                  color: "#fff",
                }}
              />
            </button>
          </div>
        </div>
        <div className={styles.miniBanners}>
          <img src={minibanner1} alt="Mini banner 1" />
          <img src={minibanner2} alt="Mini banner 2" />
        </div>
      </div>
    </section>
  );
};

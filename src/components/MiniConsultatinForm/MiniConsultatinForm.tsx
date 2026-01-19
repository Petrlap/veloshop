import React from "react";
import styles from "./MiniConsultatinForm.module.css";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";
import { FiPhone } from "react-icons/fi";
import { PiChatsBold } from "react-icons/pi";
import { TiStarFullOutline } from "react-icons/ti";
import person from "../../assets/workshop/person.webp";

export const MiniConsultatinForm: React.FC = () => {
  return (
    <div className={styles.consultation}>
      <p className={styles.title}>Узнайте как выбрать велосипед</p>
      <div className={styles.consultationBox}>
        <img src={person} alt="Person" />
        <div>
          <p className={styles.grade}>
            <IconWrapper
              Icon={TiStarFullOutline}
              size={18}
              style={{ color: "#FFC107" }}
            />{" "}
            5
          </p>
          <p className={styles.name}>Алина Александровна</p>
          <p className={styles.jobTitle}>Консультант Велошоп</p>
        </div>
      </div>
      <div className={styles.buttonsBox}>
        <button className={styles.callBtn}>
          <IconWrapper Icon={FiPhone} size={18} style={{ color: "#ffffff" }} />{" "}
          Позвонить
        </button>
        <button className={styles.writeBtn}>
          <IconWrapper
            Icon={PiChatsBold}
            size={18}
            style={{ color: "#F34723" }}
          />{" "}
          Написать
        </button>
      </div>
    </div>
  );
};

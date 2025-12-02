import styles from "./ConsultationForm.module.css";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { FaWhatsappSquare } from "react-icons/fa";
import bike from "../../assets/consultationform/bike.webp";

export const ConsultationForm: React.FC = () => {
  return (
    <div className={styles.consultation}>
      <div className={styles.consultationBox}>
        <div>
          <p className={styles.consultationTitle}>
            Нужна помощь?<br></br>
            <span>Бесплатная консультация</span>
          </p>
          <p className={styles.consultationText}>
            Оставьте заявку и мы Вам поможем!
          </p>{" "}
        </div>
        <div className={styles.whatsAppBlock}>
          <div className={styles.whatsAppContainer}>
            <IconWrapper
              Icon={FaWhatsappSquare}
              size={24}
              style={{
                color: "#2CB742",
              }}
              className={styles.whatsAppIcon}
            />
          </div>
          <svg
            width="61"
            height="14"
            viewBox="0 0 61 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M56.8614 5.36488L56.4307 4.4624L56.8614 5.36488ZM2.23204 4.32281L1.76721 5.20821L1.7672 5.20821L2.23204 4.32281ZM0.046711 3.97415C-0.117531 3.44685 0.176788 2.88625 0.704086 2.722L9.29691 0.0455553C9.82421 -0.118685 10.3848 0.175632 10.549 0.70293C10.7133 1.23023 10.419 1.79083 9.89167 1.95507L2.25361 4.33414L4.63268 11.9722C4.79692 12.4995 4.5026 13.0601 3.9753 13.2243C3.448 13.3886 2.8874 13.0943 2.72316 12.567L0.046711 3.97415ZM60.3984 3.67676L60.8292 4.57924L57.2921 6.26736L56.8614 5.36488L56.4307 4.4624L59.9677 2.77428L60.3984 3.67676ZM2.23204 4.32281L1.7672 5.20821L0.536633 4.56216L1.00147 3.67676L1.4663 2.79137L2.69688 3.43742L2.23204 4.32281ZM56.8614 5.36488L57.2921 6.26736C39.6517 14.6867 19.0738 14.2942 1.76721 5.20821L2.23204 4.32281L2.69687 3.43742C19.4452 12.2303 39.3593 12.6101 56.4307 4.4624L56.8614 5.36488Z"
              fill="#2CB742"
            />
          </svg>
          <span className={styles.consultationText}>Пиши в WhatsApp</span>
        </div>
      </div>
      <img src={bike} alt="Bike" />
    </div>
  );
};

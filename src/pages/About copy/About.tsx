import { ConsultationForm } from "../../components/ConsultationForm/ConsultationForm";
import { LeftMenu } from "../../components/LeftMenu/LeftMenu";
import styles from "./About.module.css";

export const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <span className={styles.breadcrubs}>
        главная / о компании / политика конфиденциальности
      </span>
      <h1>Политика конфиденциальности</h1>
      <div className={styles.aboutBox}>
        <LeftMenu />
        <div className={styles.contentBlock}>

        </div>
      </div>
      <div>
        <p></p>
        <p></p>
      </div>
      <ConsultationForm />
    </section>
  );
};

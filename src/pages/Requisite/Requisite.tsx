import { ConsultationForm } from "../../components/ConsultationForm/ConsultationForm";
import { LeftMenu } from "../../components/LeftMenu/LeftMenu";
import styles from "./Requisite.module.css";

export const Requisite: React.FC = () => {
  return (
    <section className={styles.requisite}>
      <span className={styles.breadcrubs}>
        главная / о компании / реквизиты
      </span>
      <h1>Реквизиты</h1>
      <div className={styles.requisiteBox}>
        <LeftMenu />
        <div className={styles.contentBlock}>
          <p>
            <span>ООО "ВЕЛОШОП"</span>
          </p>
          <p>
            <span>ОГРН</span> 1247700500948
          </p>
          <p>
            <span>ИНН</span> 7735208350/773501001
          </p>
          <p>
            <span>Адрес:</span> 124536, Г.МОСКВА, ВН.ТЕР.Г. МУНИЦИПАЛЬНЫЙ ОКРУГ
            САВЕЛКИ, Г ЗЕЛЕНОГРАД, К. 505, КВ. 2
          </p>
          <p>
            <span>Служба поддержки</span>{" "}
            <a href="tel:88005551704">8 800 555-17-04</a>,{" "}
            <a
              href="mailto:info@velo-shop.ru"
              style={{ textDecoration: "underline" }}
            >
              info@velo-shop.ru
            </a>
          </p>
        </div>
      </div>
      <ConsultationForm />
    </section>
  );
};

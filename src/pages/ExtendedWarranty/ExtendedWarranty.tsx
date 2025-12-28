import { ConsultationForm } from "../../components/ConsultationForm/ConsultationForm";
import styles from "./ExtendedWarranty.module.css";
import { IconWrapper } from "../../components/IconWrapper/IconWrapper";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export const ExtendedWarranty: React.FC = () => {
  return (
    <section className={styles.extendedWarranty}>
      <span className={styles.breadcrubs}>
        главная / справочная информация / гарантия на товар / расширенная
        гарантия
      </span>
      <h1>Гарантия = надежность</h1>
      <p>
        Купив новый велосипед каждый желает, чтобы он прослужил как можно
        дольше. Не малую роль в том какой срок будет служить вам велосипед
        занимает качество рамы и навесного оборудования установленного на нее. К
        сожалению, не все производители заботятся о долговечности своих
        велосипедов, стараясь наживиться на клиентах, но есть производители с
        совершенно иными взглядами. Производители целью которых является
        качественный продукт, которые уверены в надежности своих велосипедов и
        заботятся о клиентах предлагая дополнительную гарантию.
      </p>
      <p>
        Приобретая велосипед в магазине ВелоШоп обратите внимание на значок
        рядом с фотографией.
      </p>
      <div className={styles.whiteBox}>
        <div className={styles.iconCircle}>
          <IconWrapper
            Icon={IoShieldCheckmarkOutline}
            size={24}
            style={{ color: "#fff" }}
          />
        </div>
        <div>
          <h2>Если вы увидели значок</h2>
          <p>
            Вы можете быть уверенны в качестве данного велосипеда, а так же
            расширить гарантию на велосипед и/или компоненты сделав несколько
            простых шагов
          </p>
        </div>
      </div>
      <div className={styles.bottomBlock}>
        <div>
          <h2>Дополнительная гарантия в 2 шага</h2>
          <ul>
            <li>Необходимо перейти на сайт производителя</li>
            <li>Ввести свои контактные данные и данные велосипеда</li>
          </ul>
        </div>
        <div>
          <p>Условия дополнительной гарантии на сайтах производителей</p>
          <div className={styles.buttonBlock}>
            <button className={styles.orangeButton}>FORWARD</button>
            <button className={styles.whiteButton}>STARK</button>
          </div>
        </div>
      </div>
      <ConsultationForm />
    </section>
  );
};

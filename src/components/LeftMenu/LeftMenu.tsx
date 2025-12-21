import styles from "./LeftMenu.module.css";

export const LeftMenu: React.FC = () => {
  return (
    <div className={styles.linksBlock}>
      <a href="#">Помощь</a>
      <a href="#">Статьи</a>
      <a href="#">Вопрос-ответ</a>
      <a href="#">Производители</a>
      <a href="#">Видео обзоры</a>
    </div>
  );
};

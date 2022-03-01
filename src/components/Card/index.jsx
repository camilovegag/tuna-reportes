// import moment from "moment";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ event }) => {
  const { title, location, date } = event;
  const navigate = useNavigate();
  return (
    <article className={styles.card} onClick={() => navigate(`event/${event.id}`)}>
      <h3 className={styles.title}>{title}</h3>
      <p>
        <span className={styles.subtitle}>Ubicación:</span> {location}
      </p>
      <p>
        <span className={styles.subtitle}>Fecha:</span> {date.slice(0, -10)}
      </p>
      <p>
        <span className={styles.subtitle}>Hora:</span> {date.substr(date.length - 8)}
      </p>
    </article>
  );
};

export default Card;

import Card from "../../components/Card";
import CardSkeleton from "../../components/CardSkeleton";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Archive.module.css";

const Archive = () => {
  const { documents: events } = useCollection("events", "archive");
  const cards = [1, 2, 3, 4];
  return (
    <section className={styles.home}>
      <h2 className="page-title">Eventos archivados</h2>
      <section className={styles.events}>
        {events
          ? events.map((event) => <Card key={event.id} event={event} />)
          : cards.map(() => <CardSkeleton key={Math.random()} />)}
      </section>
    </section>
  );
};

export default Archive;

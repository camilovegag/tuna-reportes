import Card from "../../components/Card";
import styles from "./Home.module.css";
import { useCollection } from "../../hooks/useCollection";
import CardSkeleton from "../../components/CardSkeleton";
import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const { documents: events } = useCollection("events");
  const cards = [1, 2, 3, 4];
  return (
    <section className={styles.home}>
      <h2 className="page-title">Bienvenido, {user.displayName}</h2>
      <section className={styles.events}>
        {events
          ? events.map((event) => <Card key={event.id} event={event} />)
          : cards.map(() => <CardSkeleton key={Math.random()} />)}
      </section>
    </section>
  );
};

export default Home;

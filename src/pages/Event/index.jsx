import { useDoc } from "../../hooks/useDoc";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Event.module.css";
import arrow from "./arrow.svg";
import EventDetails from "../../components/EventDetails";
import AddAssistants from "../../components/AddAssistants";
import CardSkeleton from "../../components/CardSkeleton";
import Assistants from "../../components/Assistants";
import AddSongs from "../../components/AddSongs";
import Songs from "../../components/Songs";
import CreateMessage from "../../components/CreateMessage";

const Event = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const { document: event } = useDoc("events", id);
  return (
    <section className={styles.event}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <img src={arrow} alt="Go back icon" />
        <p className="page-title">Regresar</p>
      </div>
      {event ? <EventDetails event={event} /> : <CardSkeleton />}
      {event ? <CreateMessage event={event} /> : <CardSkeleton />}
      {event ? <AddAssistants existingMembers={event.members} id={id} /> : <CardSkeleton />}
      {event ? <Assistants members={event.members} id={id} /> : <CardSkeleton />}
      {event ? <AddSongs existingSongs={event.songs} id={id} /> : <CardSkeleton />}
      {event ? <Songs songs={event.songs} /> : <CardSkeleton />}
    </section>
  );
};

export default Event;

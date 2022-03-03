import styles from "./CreateMessage.module.css";

const CreateMessage = ({ event }) => {
  console.log(event);
  const { title, location, date } = event;
  return (
    <section className={styles.createMessage}>
      <h2 className="page-title">Mensaje generado</h2>
      <article className={styles.card}>
        {/* <button className={`btn ${styles.button}`}>Generar mensaje</button> */}
        <p>Querido Tuno,</p>
        <p>
          El proximo <strong>*{date.slice(0, -18)}*</strong> a las{" "}
          <strong>*{date.substr(date.length - 8)}*</strong> tendremos una {title} en{" "}
          <strong>*{location}*</strong>.
        </p>
        <p>Esperamos puedas acompañarnos.</p>
      </article>
    </section>
  );
};
export default CreateMessage;

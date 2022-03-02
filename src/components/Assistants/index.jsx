import styles from "./Assistants.module.css";

const Assistants = ({ members }) => (
  <section className={styles.assistants}>
    <h2 className="page-title">Lista de asistentes</h2>
    <article className={styles.card}>
      {members.map((member) => (
        <div key={member.member} className={styles.assistant}>
          <p>{member.member}</p>
          {"-"}
          <p>{member.state}</p>
        </div>
      ))}
    </article>
  </section>
);
export default Assistants;

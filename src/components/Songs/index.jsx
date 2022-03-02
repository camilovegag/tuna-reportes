import styles from "./Songs.module.css";

const Songs = ({ songs }) => (
  <section className={styles.songs}>
    <h2 className="page-title">Lista de canciones</h2>
    <article className={styles.card}>
      {songs.map((song) => (
        <p key={song}>{song}</p>
      ))}
    </article>
  </section>
);
export default Songs;

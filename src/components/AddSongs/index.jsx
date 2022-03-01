import { useState } from "react";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import styles from "./AddSongs.module.css";
import Swal from "sweetalert2";

const AddSongs = ({ id, existingSongs }) => {
  const [song, setSong] = useState("");
  const docRef = doc(db, "events", id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(docRef, { songs: [...existingSongs, song] }).then(() =>
      Swal.fire({
        title: "Canción añadida exitosamente",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#8d69f1",
      })
    );
    setSong("");
  };
  return (
    <section className={styles.assistants}>
      <h2 className="page-title">Añadir canciones</h2>
      <article className={styles.card}>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="member">Canción</label>
          <input
            name="member"
            type="text"
            placeholder="ej: Muñequita linda"
            onChange={(song) => setSong(song.target.value)}
            value={song}
            checked
            required
          />
          <button className="btn">Añadir canción</button>
        </form>
      </article>
    </section>
  );
};

export default AddSongs;

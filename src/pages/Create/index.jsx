import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import * as moment from "moment";
import "moment/locale/es";
import styles from "./Create.module.css";
import Swal from "sweetalert2";

const Create = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const colRef = collection(db, "events");
    await addDoc(colRef, {
      title,
      location,
      date: moment(date).format("LL, LT A"),
      time: date,
      members: [],
    })
      .then(() =>
        Swal.fire({
          title: "Evento creado exitosamente",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#8d69f1",
        })
      )
      .catch((err) => setError(err));

    setTitle("");
    setLocation("");
    setDate("");
  };
  return (
    <section className={styles.create}>
      <h2 className="page-title">Crear nuevo evento</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="title">
          Título
        </label>
        <input
          name="title"
          type="text"
          placeholder="ej: Serenata tia de Pinzas"
          onChange={(title) => setTitle(title.target.value)}
          value={title}
          required
        />
        <label className={styles.label} htmlFor="location">
          Ubicación
        </label>
        <input
          name="location"
          type="text"
          placeholder="ej: Calle 128a # 57c04, Bulevar Las Villas"
          onChange={(location) => setLocation(location.target.value)}
          value={location}
          required
        />
        <label className={styles.label} htmlFor="date">
          Fecha y hora
        </label>
        <input
          name="date"
          type="datetime-local"
          min={moment().format("YYYY-MM-DDTkk:mm")}
          onChange={(date) => setDate(date.target.value)}
          value={date}
          required
        />
        <p className={styles.helper}>Formato: mm/dd/yyyy, hora</p>
        <button className="btn">Crear evento</button>
        {error && <p className="error">{error.message}</p>}
      </form>
    </section>
  );
};

export default Create;

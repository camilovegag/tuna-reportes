import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import * as moment from "moment";
import "moment/locale/es";
import styles from "./Create.module.css";
import Swal from "sweetalert2";

const Create = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const colRef = collection(db, "events");
    await addDoc(colRef, {
      archive: false,
      title,
      status,
      location,
      date: moment(date).format("dddd LL, LT A"),
      time: date,
      members: [],
      songs: [],
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
    setStatus("");
    setLocation("");
    setDate("");
    setIsSubmitting(false);
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
        <label className={styles.label} htmlFor="status">
          Estado
        </label>
        <select name="status" onChange={(e) => setStatus(e.target.value)}>
          <option value="">Elegir estado</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Por confirmar">Por confirmar</option>
        </select>
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
        <button disabled={isSubmitting} className="btn">
          Crear evento
        </button>
        {error && <p className="error">{error.message}</p>}
      </form>
    </section>
  );
};

export default Create;

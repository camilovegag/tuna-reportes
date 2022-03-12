import { db } from "../../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import edit from "../assets/edit.svg";
import remove from "../assets/remove.svg";
import close from "../assets/close.svg";
import done from "../assets/done.svg";
import archiveIcon from "../assets/archive.svg";
import unarchiveIcon from "../assets/unarchive.svg";
import styles from "./Event.module.css";
import Swal from "sweetalert2";
import moment from "moment";

const EventDetails = ({ event }) => {
  const navigate = useNavigate();
  const { title, location, date, id, time, archive, status } = event;
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newStatus, setNewStatus] = useState(status);
  const [newLocation, setNewLocation] = useState(location);
  const [newDate, setNewDate] = useState(time);

  useEffect(() => {
    setNewTitle(title);
    setNewStatus(status);
    setNewLocation(location);
    setNewDate(time);
  }, [title, status, location, time]);

  const docRef = doc(db, "events", id);

  const handleDeleteClick = () => {
    Swal.fire({
      title: "¿Deseas eliminar este evento?",
      text: "Esta accion no puede deshacerse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#8d69f1",
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#d13267",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "El evento ha sido eliminado",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#8d69f1",
        }).then(() => {
          navigate("/");
          deleteDoc(docRef);
        });
      }
    });
  };

  const handleArchiveClick = () => {
    Swal.fire({
      title: "¿Deseas archivar este evento?",
      text: "Esta accion no puede deshacerse",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, archivar",
      confirmButtonColor: "#8d69f1",
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#d13267",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "El evento ha sido archivado",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#8d69f1",
        }).then(() => updateDoc(docRef, { archive: true }));
      }
    });
  };

  const handleUnarchiveClick = () => {
    Swal.fire({
      title: "¿Deseas desarchivar este evento?",
      text: "Esta accion no puede deshacerse",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, desarchivar",
      confirmButtonColor: "#8d69f1",
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#d13267",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "El evento ha sido desarchivado",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#8d69f1",
        }).then(() => updateDoc(docRef, { archive: false }));
      }
    });
  };

  const handleEditClick = () => {
    const newEvent = {
      title: newTitle,
      status: newStatus,
      location: newLocation,
      date: moment(newDate).format("LL, LT A"),
      time: newDate,
    };
    Swal.fire({
      title: "¿Deseas actualizar este evento?",
      text: "Esta accion no puede deshacerse",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, actualizar",
      confirmButtonColor: "#8d69f1",
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#d13267",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "El evento ha sido actualizado",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#8d69f1",
        }).then(() => {
          updateDoc(docRef, newEvent);
          setNewTitle(title);
          setNewStatus(status);
          setNewLocation(location);
          setNewDate(date);
          setEditMode(false);
        });
      }
    });
  };

  return (
    <article className={styles.card}>
      {!editMode ? (
        <>
          <section className={styles.text}>
            <h3 className={styles.title}>{title}</h3>
            <p>
              <span className={styles.subtitle}>Estado:</span>{" "}
              <span
                className={
                  status === "Confirmada"
                    ? styles.confirmed
                    : status === "Cancelada"
                    ? styles.canceled
                    : status === "Por confirmar"
                    ? styles.pending
                    : styles.ended
                }
              >
                {status}
              </span>
            </p>
            <p>
              <span className={styles.subtitle}>Ubicación:</span> {location}
            </p>
            <p>
              <span className={styles.subtitle}>Fecha:</span>{" "}
              {date.slice(0, -10)}
            </p>
            <p>
              <span className={styles.subtitle}>Hora:</span>{" "}
              {date.substr(date.length - 8)}
            </p>
          </section>
          <section className={styles.icons}>
            <img
              onClick={() => setEditMode(true)}
              className={styles.edit}
              src={edit}
              alt="Edit icon"
            />

            {archive !== true ? (
              <img
                onClick={() => handleArchiveClick()}
                className={styles.archive}
                src={archiveIcon}
                alt="Archive icon"
                title="Archivar evento"
              />
            ) : (
              <>
                <img
                  onClick={() => handleUnarchiveClick()}
                  className={styles.archive}
                  src={unarchiveIcon}
                  alt="Unarchive icon"
                  title="Desarchivar evento"
                />
                <img
                  onClick={() => handleDeleteClick()}
                  className={styles.remove}
                  src={remove}
                  alt="Remove icon"
                />
              </>
            )}
          </section>
        </>
      ) : (
        <>
          <section className={styles.text}>
            <div className={styles.side}>
              <p className={styles.subtitle}>Título:</p>
              <input
                type="text"
                value={newTitle}
                onChange={(newTitle) => setNewTitle(newTitle.target.value)}
              />
            </div>
            <div className={styles.side}>
              <p className={styles.subtitle}>Estado:</p>
              <select
                name="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Confirmada">Confirmada</option>
                <option value="Por confirmar">Por confirmar</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Realizada">Realizada</option>
              </select>
            </div>
            <div className={styles.side}>
              <p className={styles.subtitle}>Ubicación:</p>
              <input
                type="text"
                value={newLocation}
                onChange={(newLocation) =>
                  setNewLocation(newLocation.target.value)
                }
              />
            </div>
            <div className={styles.side}>
              <span className={styles.subtitle}>Fecha:</span>
              <input
                type="datetime-local"
                value={newDate}
                onChange={(newDate) => setNewDate(newDate.target.value)}
              />
            </div>
          </section>
          <section className={styles.icons}>
            <img
              onClick={() => setEditMode(false)}
              className={styles.close}
              src={close}
              alt="Edit icon"
            />
            <img
              onClick={() => handleEditClick()}
              className={styles.done}
              src={done}
              alt="Remove icon"
            />
          </section>
        </>
      )}
    </article>
  );
};

export default EventDetails;

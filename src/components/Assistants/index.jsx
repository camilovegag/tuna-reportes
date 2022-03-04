import { useEffect, useState } from "react";
import styles from "./Assistants.module.css";
import edit from "../assets/edit.svg";
import filter from "../assets/filter.svg";
import nofilter from "../assets/nofilter.svg";
import remove from "../assets/remove.svg";
import close from "../assets/close.svg";
import done from "../assets/done.svg";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Assistants = ({ members, id }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedMembers, setEditedMembers] = useState(members);

  useEffect(() => setEditedMembers(members), [members]);

  const reoder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const docRef = doc(db, "events", id);

  const handleDeleteClick = (member) => {
    Swal.fire({
      title: "¿Deseas eliminar este asistente?",
      text: "Esta accion no puede deshacerse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#8d69f1",
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#d13267",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditedMembers((prevMembers) =>
          prevMembers.filter((obj) => obj.member !== member.member)
        );
        Swal.fire({
          title: "El asistente ha sido eliminado",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#8d69f1",
        });
      }
    });
  };

  const handleFliterClick = () => {
    Swal.fire({
      title: "Filtrar asistentes",
      input: "select",
      inputOptions: {
        Asiste: "Asiste",
        "No asiste": "No asiste",
        "Por confirmar": "Por confirmar",
        "No responde": "No responde",
      },
      inputPlaceholder: "Selecciona un estado",
      showCancelButton: true,
      confirmButtonText: "Filtrar",
      confirmButtonColor: "#8d69f1",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d13267",
      inputValidator: (value) => {
        setEditedMembers((prevMembers) => prevMembers.filter((member) => member.state === value));
      },
    });
  };

  const handleDeleteFilter = () => setEditedMembers(members);

  const handleEditClick = () => {
    Swal.fire({
      title: "¿Deseas actualizar la lista de aistentes?",
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
          title: "La lista de aistentes ha sido actualizada",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#8d69f1",
        }).then(() => {
          updateDoc(docRef, { members: editedMembers });
          setEditedMembers(members);
          setEditMode(false);
        });
      }
    });
  };

  return (
    <section className={styles.assistants}>
      <h2 className="page-title">Lista de asistentes</h2>
      <article className={styles.card}>
        {!editMode ? (
          <>
            <section className={styles.text}>
              {editedMembers.map((member) => (
                <div key={member.member} className={styles.assistant}>
                  <p>{member.member}</p>
                  <p className={styles.dash}>-</p>
                  <p
                    className={
                      member.state === "Asiste"
                        ? styles.attend
                        : member.state === "No asiste"
                        ? styles.noattend
                        : member.state === "Por confirmar"
                        ? styles.pending
                        : styles.noanswere
                    }
                  >
                    {member.state}
                  </p>
                </div>
              ))}
            </section>
            <section className={styles.icons}>
              <img
                onClick={() => setEditMode(true)}
                className={styles.edit}
                src={edit}
                alt="Edit icon"
              />
              <img
                onClick={handleFliterClick}
                className={styles.filter}
                src={filter}
                alt="Filter icon"
              />
              <img
                onClick={handleDeleteFilter}
                className={styles.nofilter}
                src={nofilter}
                alt="No filter icon"
              />
            </section>
          </>
        ) : (
          <>
            <DragDropContext
              onDragEnd={(result) => {
                const { source, destination } = result;
                if (!destination) return;
                if (source.index === destination.index) return;
                setEditedMembers((prevMembers) =>
                  reoder(prevMembers, source.index, destination.index)
                );
              }}
            >
              <Droppable droppableId="members">
                {(droppableProvided) => (
                  <section
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className={styles.text}
                  >
                    {editedMembers.map((member, index) => (
                      <Draggable key={member.member} draggableId={member.member} index={index}>
                        {(draggableProvided) => (
                          <div
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                            className={styles.assistant}
                          >
                            <div className={styles.deleteMobile}>
                              <img
                                onClick={() => handleDeleteClick(member)}
                                className={styles.remove}
                                src={remove}
                                alt="Remove icon"
                              />
                              <p>{member.member}</p>
                            </div>
                            <div className={styles.delete}>
                              <img
                                onClick={() => handleDeleteClick(member)}
                                className={styles.remove}
                                src={remove}
                                alt="Remove icon"
                              />
                              <p>{member.member}</p>
                            </div>

                            <p className={styles.dash}>-</p>
                            <p
                              className={
                                member.state === "Asiste"
                                  ? styles.attend
                                  : member.state === "No asiste"
                                  ? styles.noattend
                                  : member.state === "Por confirmar"
                                  ? styles.pending
                                  : styles.noanswere
                              }
                            >
                              {member.state}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                  </section>
                )}
              </Droppable>
            </DragDropContext>
            <section className={styles.icons}>
              <img
                onClick={() => setEditMode(false)}
                className={styles.close}
                src={close}
                alt="Edit icon"
              />
              <img onClick={handleEditClick} className={styles.done} src={done} alt="Remove icon" />
              <p>Bulto</p>
            </section>
          </>
        )}
      </article>
    </section>
  );
};
export default Assistants;

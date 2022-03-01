import { useState } from "react";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import styles from "./AddAssistants.module.css";
import Swal from "sweetalert2";

const AddAssistants = ({ id, existingMembers }) => {
  const [state, setState] = useState("");
  const [member, setMember] = useState("");
  const docRef = doc(db, "events", id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(docRef, { members: [...existingMembers, { member, state }] }).then(() =>
      Swal.fire({
        title: "Integrante añadido exitosamente",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#8d69f1",
      })
    );
    setMember("");
  };
  return (
    <section className={styles.assistants}>
      <h2 className="page-title">Añadir asistentes</h2>
      <article className={styles.card}>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="member">Integrante</label>
          <input
            name="member"
            type="text"
            placeholder="ej: Baygón"
            onChange={(member) => setMember(member.target.value)}
            value={member}
            checked
            required
          />
          <label htmlFor="state">Estado</label>
          <section className={styles.state}>
            <p>Asiste</p>
            <input
              type="radio"
              name="state"
              value="Asiste"
              onChange={(state) => setState(state.target.value)}
              required
            />
            <p>No Asiste</p>
            <input
              type="radio"
              name="state"
              value="No asiste"
              onChange={(state) => setState(state.target.value)}
            />
            <p>Por confirmar</p>
            <input
              type="radio"
              name="state"
              value="Por confirmar"
              onChange={(state) => setState(state.target.value)}
            />
            <p>No responde</p>
            <input
              type="radio"
              name="state"
              value="No responde"
              onChange={(state) => setState(state.target.value)}
            />
          </section>
          <button className="btn">Añadir integrante</button>
        </form>
      </article>
    </section>
  );
};

export default AddAssistants;

import { useSignup } from "../../hooks/useSignup";
import { useState } from "react";
import styles from "./Signup.module.css";
import Swal from "sweetalert2";

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { signup } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#8d69f1",
      });
      return;
    }
    signup(email, password, nickname).catch((error) => {
      Swal.fire({
        title: "¡Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#8d69f1",
      });
    });
  };
  return (
    <section className={styles.signup}>
      <h2 className="page-title">Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="nickname">
          Apodo
        </label>
        <input
          type="nickname"
          name="nickname"
          placeholder="ej: Garbo"
          onChange={(nickname) => setNickname(nickname.target.value)}
          required
          value={nickname}
        />
        <label className={styles.label} htmlFor="email">
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          placeholder="ej: correo@tunasabana.co"
          onChange={(email) => setEmail(email.target.value)}
          required
          value={email}
        />
        <label className={styles.label} htmlFor="password">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          onChange={(password) => setPassword(password.target.value)}
          required
          value={password}
        />
        <label className={styles.label} htmlFor="repeatPassword">
          Repetir contraseña
        </label>
        <input
          name="repeatPassword"
          type="password"
          placeholder="••••••••"
          onChange={(repeatPassword) => setRepeatPassword(repeatPassword.target.value)}
          required
          value={repeatPassword}
        />
        <button className="btn">Crear cuenta</button>
      </form>
    </section>
  );
};

export default Signup;

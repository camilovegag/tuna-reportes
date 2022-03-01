import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLogin } from "../../hooks/useLogin";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).catch((error) => {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#8d69f1",
      });
    });
  };
  return (
    <section className={styles.signup}>
      <h2 className="page-title">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="email">
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          placeholder="correo@tunasabana.co"
          onChange={(email) => setEmail(email.target.value)}
          value={email}
          required
        />
        <label className={styles.label} htmlFor="password">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          onChange={(password) => setPassword(password.target.value)}
          value={password}
          required
        />
        <button className="btn">Iniciar sesión</button>
        <p className={styles.createAcc}>
          ¿No tienes cuenta?{" "}
          <span onClick={() => navigate("/signup")} className={styles.create}>
            Crea una aquí
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;

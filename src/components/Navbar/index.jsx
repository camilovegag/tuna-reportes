import styles from "./Header.module.css";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <h1 className={styles.logo}>Reportes Tuna</h1>
        <nav>
          <ul>
            {user && <li onClick={() => navigate("/")}>Inicio</li>}
            {user && <li onClick={() => navigate("/create")}>Crear evento</li>}
            {!user && <li onClick={() => navigate("/login")}>Iniciar sesión</li>}
            {!user && <li onClick={() => navigate("/signup")}>Crear cuenta</li>}
            {user && <li onClick={logout}>Cerrar sesión</li>}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

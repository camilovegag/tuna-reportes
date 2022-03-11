import { useMemo } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.footer}>
      <p> Tuna Sabana &copy; {year}</p>
    </footer>
  );
};

export default Footer;

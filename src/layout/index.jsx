import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "./Layout.module.css";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className={styles.main}>{children}</main>
    <Footer />
  </>
);

export default Layout;

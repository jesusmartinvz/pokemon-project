import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./DefaultLayout.module.css";

export function DefaultLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <NavLink to="/" className={styles.brand}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavLink>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
          >
            Principal
          </NavLink>
          <NavLink
            to="/favoritos"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
          >
            Mis Favoritos
          </NavLink>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

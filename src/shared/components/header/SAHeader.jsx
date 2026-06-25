import { NavLink, useNavigate } from "react-router-dom";
import styles from "./SAHeader.module.css";
import { useAuth } from "../../context/AuthContext";

const SAHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getNavClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`;

  return (
    <header className={styles.header}>
      <div className={`max-content-wrapper ${styles.navWrapper}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>⚑</span>
          <span className={styles.appName}>FlagForge</span>
          <span className={styles.badge}>Super Admin</span>
        </div>

        {/* <nav className={styles.nav}>
        <NavLink to="/organizations" className={getNavClass}>
          Organizations
        </NavLink>
        <NavLink to="/flags" className={getNavClass}>
          Feature Flags
        </NavLink>
      </nav> */}

        <div className={styles.userArea}>
          {/* <span className={styles.userEmail}>{user?.email}</span> */}
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default SAHeader;

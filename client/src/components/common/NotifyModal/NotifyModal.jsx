import { NavLink } from "react-router-dom";
import styles from "./NotifyModal.module.css";

const NotifyModal = ({ title, message, active, setActive, isError, route }) => {

  const handleBackgroundClick = () => setActive(false);
  const handleConfirm = () => {
    setActive(false);
  };

  return (
    <div
      className={`${styles.modal} ${active ? styles.active : ""}`}
      onClick={handleBackgroundClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.modalContent} ${active ? styles.activeContent : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={`${styles.title} ${isError ? "error": ""}`}>
          {title}
        </h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.modalControls}>
          {!isError && route && <NavLink to={route} className={styles.modalLink}>
            To {route.slice(1)}
          </NavLink>}
          <button onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyModal;

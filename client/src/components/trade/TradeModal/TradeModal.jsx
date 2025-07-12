import { useNavigate } from "react-router-dom";
import styles from "./TradeModal.module.css";
import { PORTFOLIO_ROUTE } from "../../../utils/consts";

const TradeModal = ({
  title,
  message,
  active,
  setActive,
  isError,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isError) {
      setActive(false);
    } else {
      navigate(PORTFOLIO_ROUTE);
      setActive(false);
    }
  };
  return (
    <div
      className={`${styles.modal} ${active ? styles.active : ""}`}
      onClick={() => setActive(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.modalContent} ${active ? styles.activeContent : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={`${styles.title} ${isError ? styles.errorTitle : ""}`}>
          {title}
        </h3>
        <p className={styles.message}>{message}</p>
    {console.log(isError)}
        
        <button className={styles.button} onClick={handleClick}>
          {isError ? "Confirm" : "To portfolio"}
        </button>
      </div>
    </div>
  );
};

export default TradeModal;

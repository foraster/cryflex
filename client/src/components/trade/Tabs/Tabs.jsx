import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../index";
import styles from "./Tabs.module.css";

const Tabs = observer(() => {
  const { user } = useContext(Context);

  const handleTabChange = (isBuying) => {
    user.setIsBuying(isBuying);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.tab} ${styles.buy} ${
          user.isBuying ? styles.active : ""
        }`}
        onClick={() => handleTabChange(true)}
      >
        Buy
      </button>

      <button
        className={`${styles.tab} ${styles.sell} ${
          !user.isBuying ? styles.active : ""
        }`}
        onClick={() => handleTabChange(false)}
      >
        Sell
      </button>
    </div>
  );
});

export default Tabs;
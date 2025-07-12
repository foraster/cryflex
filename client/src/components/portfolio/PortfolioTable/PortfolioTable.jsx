import { NavLink } from "react-router-dom";
import { formatNumber } from "../../../utils/helpers";
import { fromSatoshi, toFiat } from "../../../utils/money";
import styles from "./PortfolioTable.module.css";
import { TRADE_ROUTE } from "../../../utils/consts";
import { useContext } from "react";
import { Context } from "../../..";

const PortfolioTable = ({
  data,
  columns,
  getCryptoName,
  getCryptoPrice,
  getCryptoIcon,
  type,
}) => {
  const { user } = useContext(Context)
  return (
    <div className={styles.tableWrapper}>
      <table className={`${styles.table} ${styles[type]}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((crypto) => (
              // Render each crypto item in the table
              <tr className={styles.itemRow} key={crypto.id}>
                {/* Render the icon and symbol with name */}
                <td className={styles.nameCell}>
                  <img
                    className={styles.icon}
                    alt="crypto-icon"
                    src={getCryptoIcon(crypto.symbol)}
                  />
                  <div className={styles.symbol}>
                    {crypto.symbol} |{" "}
                    <span className={styles.details}>
                      {getCryptoName(crypto.symbol)}
                    </span>
                  </div>
                </td>
                {/* Render the amount of crypto */}
                <td>{fromSatoshi(crypto.amount)}</td>
                {/* Render the price of crypto depending on the table type */}
                {type === "purchases" ? (
                  <td>{toFiat(crypto.price_pico_usd)} $</td>
                ) : (
                  <td>{formatNumber(getCryptoPrice(crypto.symbol))}$</td>
                )}
                {/* Render the total cost of crypto depending on the table type*/}
                {type === "purchases" ? (
                  <td className={crypto.activity === "bought" ? "rate-up" : "rate-down"}>{crypto.activity === "bought" ? "+" : "-"}{toFiat(toFiat(crypto.price_pico_usd * crypto.amount))}$</td>
                ) : (
                  <td>
                    {toFiat(
                      getCryptoPrice(crypto.symbol) * crypto.amount
                    )}
                    $
                  </td>
                )}

                {/* Render the activity of crypto (bought/sold) */}
                <td
                  className={
                    crypto.activity === "sold" ? styles.red : styles.green
                  }
                >
                  {crypto.activity}
                </td>
                {/* Render the date and time of purchase/sale */}
                {type === "purchases" && (
                  <>
                    <td>{crypto.createdAt.slice(0, 10)}</td>
                    <td>{crypto.createdAt.slice(11, 16)}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            // Render a row when there is no data
            <tr className={styles.noDataRow}>
              <td>The portfolio is empty. <NavLink to={TRADE_ROUTE} className="link" onClick={() => {user.setIsBuying(true)}}>Buy some crypto</NavLink></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;

import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { getList } from "../../http/cryptoAPI";
import Pagination from "../../components/common/Pagination/Pagination";
import Filter from "../../components/market/Filter/Filter";
import Search from "../../components/market/Search/Search";
import Sort from "../../components/market/Sort/Sort";
import Loading from "../../components/common/Loading";
import styles from "./Market.module.css";
import { formatPrice, formatRate } from "../../utils/helpers";

const Market = observer(() => {
  const { cryptos } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const limit = cryptos.limit;
  const startIndex = (cryptos.page - 1) * limit;
  const endIndex = startIndex + limit;

  const currentCryptos = cryptos.sortedList.length
    ? cryptos.sortedList.slice(startIndex, endIndex)
    : cryptos.filteredList.length
    ? cryptos.filteredList.slice(startIndex, endIndex)
    : cryptos.list.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoading(true);
        const data = await getList();
        cryptos.setCryptos(data);
        cryptos.setPage(1);
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, [cryptos]);

  return (
    <main className={styles.wrapper}>
      {loading && <Loading />}
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <Filter />
          <Search />
        </div>

        <section className={styles.tableSection}>
          <Sort />
          {currentCryptos.length ? (
            <ul className={styles.list}>
              {currentCryptos.map((crypto) => (
                <li key={crypto.id}>
                  <a href={`market/info/${crypto.symbol}`} className={styles.itemLink}>
                    <div className={styles.item}>
                      <div className={styles.symbol}>
                        <img
                          className={styles.icon}
                          alt="crypto-icon"
                          src={(() => {
                            try {
                              return require(`../../img/crypto/${crypto.symbol}.png`);
                            } catch {
                              return require(`../../img/crypto/default.png`);
                            }
                          })()}
                        />
                        {crypto.symbol}&nbsp;
                        <span className={`${styles.name} gray`}>|&nbsp;{crypto.name}</span>
                      </div>
                      <div className={styles.price}>
                        $
                        {formatPrice(crypto.price)}
                      </div>
                      <div
                        className={`${styles.rate} ${
                          crypto.change24h < 0
                            ? "rate-down"
                            : "rate-up"
                        }`}
                      >
                        {formatRate(crypto.change24h)}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            !loading && (
              <div className={styles.error}>Sorry, we couldn't load the cryptocurrencies<br/> Please try again later</div>
            )
          )}
        </section>

        <div className={styles.pagination}>{currentCryptos.length > 0 && <Pagination list={cryptos} />}</div>
      </div>
    </main>
  );
});

export default Market;

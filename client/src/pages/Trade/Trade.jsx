import { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { getList } from "../../http/cryptoAPI";
import { buyCrypto, sellCrypto } from "../../http/tradeAPI";
import { getOwnedCryptos } from "../../http/userAPI";
import { formatNumber, getCryptoPrice } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { PORTFOLIO_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";

import NotifyModal from "../../components/common/NotifyModal/NotifyModal";
import TradeForm from "../../components/trade/TradeForm/TradeForm";
import Tabs from "../../components/trade/Tabs/Tabs";
import Loading from "../../components/common/Loading";

import styles from "./Trade.module.css";
import { toPriceUnits, toSatoshi } from "../../utils/money";

const Trade = observer(() => {
  const { cryptos, user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cash, setCash] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const {
    isAuth,
    user: { id },
    isBuying,
  } = user;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getList();
        cryptos.setCryptos(data);
        if (isAuth) {
          const owned = await getOwnedCryptos(id);
          user.setOwnedCryptos(owned.ownedCryptos);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [cryptos, isAuth, id, user]);

  useEffect(() => {
    setCash(0);
    setCryptoAmount(0);
    if (cryptos.list.length > 0 && isBuying) {
      setSelectedCrypto({
        price: cryptos.list[0].price,
        symbol: cryptos.list[0].symbol,
      });
    } else if (user.ownedCryptos.length > 0 && !isBuying) {
      const owned = user.ownedCryptos[0];
      setSelectedCrypto({
        price: getCryptoPrice(owned.symbol, cryptos ),
        symbol: owned.symbol,
        amount: owned.amount,
      });
    }
  }, [cryptos, isBuying, user]);

  const updateUserData = async (response) => {
    const updated = await getOwnedCryptos(id);
    user.setOwnedCryptos(updated.ownedCryptos);
    user.setBalance(response.updatedBalance);
  };

  const handleTransaction = async (type) => {
    if (!cryptoAmount || !cash) {
      setTitle("Error during transaction");
      setMessage("Enter the amount");
      setIsError(true);
      setShowModal(true);
      return;
    }
    if (cash < 10) {
      setTitle("Error during transaction");
      setMessage("Minimal transaction amount 10$");
      setIsError(true);
      setShowModal(true);
      return;
    }
    try {
      const handler = type === "bought" ? buyCrypto : sellCrypto;
      const satoshiAmount = toSatoshi(cryptoAmount);
      const unitsPrice = toPriceUnits(selectedCrypto.price);
      const response = await handler(
        user.user.id,
        selectedCrypto.symbol,
        satoshiAmount,
        unitsPrice
      );
      updateUserData(response);
      setTitle("Transaction approved");
      setMessage(
        `${type} ${formatNumber(cryptoAmount, 6)} ${
          selectedCrypto.symbol
        } for ${formatNumber(cash)}$`
      );
      setIsError(false);
      setShowModal(true);
    } catch (e) {
      setTitle("Error during transaction");
      setMessage(e.response.data.message);
      setIsError(true);
      setShowModal(true);
    }
  };

  return (
    <main className={styles.wrapper}>
      {loading && <Loading />}
      <div className={styles.container}>
        <NotifyModal
          title={title}
          message={message}
          active={showModal}
          setActive={setShowModal}
          isError={isError}
          route={PORTFOLIO_ROUTE}
        />
        <Tabs />
        <div
          className={`${styles.form} ${
            user.isBuying ? styles.buy : styles.sell
          }`}
        >
          {!cryptos.list.length && !loading && (
            <div className={styles.error}>
              Sorry, we couldn't load the cryptocurrencies
              <br /> Please try again later
            </div>
          )}
          <TradeForm
            selectedCrypto={selectedCrypto}
            setSelectedCrypto={setSelectedCrypto}
            cash={cash}
            setCash={setCash}
            cryptoAmount={cryptoAmount}
            setCryptoAmount={setCryptoAmount}
            error={error}
            setError={setError}
          />
          {isAuth ? (
            <div className={`${styles.button} ${error && styles.disabled}`}>
              <button
                onClick={() => handleTransaction(isBuying ? "bought" : "sold")}
                disabled={!!error}
              >
                {user.isBuying ? "Buy" : "Sell"}
              </button>
            </div>
          ) : (
            <div className={styles.button}>
              <button onClick={ () => navigate(REGISTRATION_ROUTE)}>
                Sign Up / Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
});

export default Trade;     
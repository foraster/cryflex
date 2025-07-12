import { useCallback, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../index";
import { getCryptoPrice } from "../../../utils/helpers";
import { useTradeForm } from "../useTradeForm";
import { MAX_USD } from "../../../utils/consts";
import FormGroup from "../FormGroup/FormGroup";
import styles from "./TradeForm.module.css";
import { toPriceUnits } from "../../../utils/money";

const TradeForm = observer(
  ({
    selectedCrypto,
    setSelectedCrypto,
    cash,
    setCash,
    cryptoAmount,
    setCryptoAmount,
    error,
    setError,
  }) => {
    const { cryptos, user } = useContext(Context);
    const { isAuth, isBuying } = user;
    const {
      handleCryptoAmountChange,
      handleCashChange,
      handleSelectCrypto,
      handleAllCryptoSelect,
      handleAllCashSelect,
      getCryptoMaxValue,
    } = useTradeForm({
      balance: user.balance,
      cryptos,
      isBuying,
      selectedCrypto,
      setSelectedCrypto,
      cash,
      setCash,
      cryptoAmount,
      setCryptoAmount,
      setError,
    });
    const isSelectAllDisabled = !isAuth || !selectedCrypto?.symbol || (isBuying && Number(user.balance) < Number(toPriceUnits(10)));
    const onSelectAll = useCallback(() => {
      isBuying
        ? handleAllCashSelect(selectedCrypto)
        : handleAllCryptoSelect(selectedCrypto);
    }, [isBuying, selectedCrypto, handleAllCashSelect, handleAllCryptoSelect]);

    return (
      <div className={styles.groupWrapper}>
        <div className={isBuying ? styles.top : styles.bottom}>
          {/* Money field */}
          <FormGroup
            label={isBuying ? "From balance" : "To balance"}
            value={cash}
            onChangeInput={handleCashChange}
            useMoneyFormat={true}
            currencyLabel="USD"
            isBuying={isBuying}
            isAuth={isAuth}
            maxValue={MAX_USD}
          />
          {isAuth && error && <p className={styles.error}> {error} </p>}
        </div>
        {/* Sell all button */}
        <div
          className={`${styles.buttonContainer} ${styles.middle} ${
            isSelectAllDisabled ? styles.disabled : ""
          }`}
        >
          <button
            className={styles.selectAll}
            onClick={onSelectAll}
            disabled={isSelectAllDisabled}
          >
            {isBuying ? "Buy all" : "Sell all"}
          </button>
        </div>
        <div className={isBuying ? styles.bottom : styles.top}>
          {/* Cryptocurrency field */}
          <FormGroup
            label={`Choose cryptocurrency to ${isBuying ? "buy" : "sell"}`}
            value={cryptoAmount}
            onChangeInput={handleCryptoAmountChange}
            onChangeSelect={(selectedOption) => {
              handleSelectCrypto(selectedOption);
            }}
            useMoneyFormat={false}
            options={
              isBuying
                ? cryptos.list.map((crypto) => ({
                    id: crypto.id,
                    value: {
                      price: crypto.price,
                      symbol: crypto.symbol,
                    },
                    label: crypto.symbol + "| " + crypto.name,
                  }))
                : user.ownedCryptos.map((crypto) => ({
                    id: crypto.id,
                    value: {
                      price: getCryptoPrice(crypto.symbol, cryptos),
                      symbol: crypto.symbol,
                      amount: crypto.amount,
                    },
                    label: crypto.symbol,
                  }))
            }
            selectedValue={selectedCrypto}
            isBuying={isBuying}
            isAuth={isAuth}
            maxValue={
              isBuying && selectedCrypto?.price
                ? getCryptoMaxValue(MAX_USD, selectedCrypto.price)
                : undefined
            }
          />
        </div>
      </div>
    );
  }
);

export default TradeForm;

import {
  toSatoshi,
  fromSatoshi,
  toPriceUnits,
  fromPriceUnits,
  getTotalPrice,
  getCryptoValue,
  getCashValue,
} from "../../utils/money";
import { getCryptoPrice } from "../../utils/helpers";
import Decimal from "decimal.js";

export const useTradeForm = ({
  balance,
  cash,
  setCash,
  cryptoAmount,
  setCryptoAmount,
  selectedCrypto,
  setSelectedCrypto,
  isBuying,
  setError,
}) => {
  const userBalance = new Decimal(balance);

  const handleCashChange = (value) => {
    const price = toPriceUnits(selectedCrypto.price);
    const cashValue = toPriceUnits(value);
    const cryptoAmountValue = getCryptoValue(cashValue, price);
    if (isBuying && cashValue.gt(userBalance)) {
      setError("Not enough balance");
    } else {
      setError(null);
    }

    setCryptoAmount(fromSatoshi(cryptoAmountValue));
    setCash(value);
  };

  const handleCryptoAmountChange = (value) => {
    const price = toPriceUnits(selectedCrypto.price);
    const cryptoAmountValue = toSatoshi(value);
    if (!isBuying) {
      const ownedCryptoAmountValue = selectedCrypto.amount;
      if (cryptoAmountValue.gt(ownedCryptoAmountValue))
        setError("Not enough crypto to sell");
    }
    const cashValue = getTotalPrice(price, cryptoAmountValue);

    if (isBuying && cashValue.gt(userBalance)) {
      setError("Not enough balance");
    } else {
      setError(null);
    }
    setCryptoAmount(value);
    setCash(fromPriceUnits(cashValue));
  };

  const handleSelectCrypto = (selectedOption) => {
    const { symbol, price, amount } = selectedOption;
    let actualPrice = price;
    if (!price) {
      actualPrice = toPriceUnits(getCryptoPrice(symbol));
    }
    if (amount) {
      setSelectedCrypto({ price: actualPrice, symbol, amount });
    } else {
      setSelectedCrypto({ price: actualPrice, symbol });
    }

    const cashValue = toPriceUnits(cash);
    const cryptoAmountValue = getCryptoValue(cashValue, toPriceUnits(price));
    setCryptoAmount(fromSatoshi(cryptoAmountValue));
  };

  const handleAllCryptoSelect = (selectedCrypto) => {
    if (!selectedCrypto.amount || !selectedCrypto.price) return;
    let amount = selectedCrypto.amount;
    setCryptoAmount(fromSatoshi(amount));
    const priceUnits = toPriceUnits(selectedCrypto.price);
    const cashValue = getCashValue(amount, priceUnits);
    setCash(fromPriceUnits(cashValue));
  };
  const handleAllCashSelect = (selectedCrypto) => {
    const cash = userBalance;
    if (cash < 10) {
      setError("Not enough balance");
    }
    setCash(fromPriceUnits(cash));
    const price = toSatoshi(selectedCrypto.price);
    setCryptoAmount(fromSatoshi(getCryptoValue(cash, price)));
  };

  const getCryptoMaxValue = (MaxUsd, price) => {
    if (!price || price <= 0) return 0;
    return new Decimal(MaxUsd).mul(1e8).div(price).div(1e8).toNumber();
  };

  return {
    cash,
    cryptoAmount,
    handleCryptoAmountChange,
    handleCashChange,
    handleSelectCrypto,
    handleAllCryptoSelect,
    handleAllCashSelect,
    getCryptoMaxValue,
  };
};

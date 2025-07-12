import Decimal from 'decimal.js';

export const formatNumber = (number, maxDecimals = 2) => {
  const rounded = new Decimal(number)
    .toDecimalPlaces(maxDecimals)
    .toNumber();

  return rounded
    .toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    })
    .replace(/,/g, "");
};

export const fromCents = (balanceCents) => {
  return (balanceCents / 100).toFixed(2);
}

 export const getCryptoPrice = (symbol, cryptos) => {
  const crypto = cryptos.list.find((c) => c.symbol === symbol);
  return crypto ? crypto.price : "N/A";
};

export const validatePassword = (password) => {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    password.length >= 8
  );
}

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export const formatPrice = (price) => {
  const d = new Decimal(price);
  if (d.gte(1)) {
    return d.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2) // ensures two decimal places for prices >= 1
  }
  return d.toSignificantDigits(4).toFixed(); // ensures plain decimal notation
};

export const formatRate = (rate) => {
  const p = new Decimal(rate);
  return p.gte(0) ? `+${p.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)}%` : p.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2) + '%';
}
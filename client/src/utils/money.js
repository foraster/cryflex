import Decimal from "decimal.js";

export const BTC_SCALE = new Decimal("1e8");
export const USD_SCALE = new Decimal("1e8");

// Converts between different units of cryptocurrency and fiat currency
export const toPriceUnits = (usdStr) => {
  if (!usdStr || isNaN(usdStr)) return new Decimal(0);
  return new Decimal(usdStr).mul(USD_SCALE).round();
};

export const toSatoshi = (btcStr) => {
  if (!btcStr || isNaN(btcStr)) return new Decimal(0);
  return new Decimal(btcStr).mul(BTC_SCALE).round();
};

export const toFiat = (priceInt) =>
  new Decimal(priceInt).div(USD_SCALE).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2);


export const fromPriceUnits = (priceInt) =>
  new Decimal(priceInt).div(USD_SCALE).toString();

export const fromSatoshi = (satInt) => 
    new Decimal(satInt).div(BTC_SCALE).toString();

// Calculates the total price in fiat currency for a given amount of cryptocurrency
export const getTotalPrice = (priceUnits, satoshiAmount) =>
  new Decimal(priceUnits).mul(satoshiAmount).div(BTC_SCALE).floor();

export const getCryptoValue = (usdValue, priceUnits) => {
  return new Decimal(usdValue).mul(BTC_SCALE).div(priceUnits).floor();
};

export const getCashValue = (crypto, priceUnits) => {
  return new Decimal(crypto)
    .mul(priceUnits)
    .div(USD_SCALE)
    .toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
};

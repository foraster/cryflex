import { useState, useEffect } from "react";
import Decimal from "decimal.js";
import styles from "./TradeInput.module.css";

const TradeInput = ({
  placeholder,
  value,
  onChange,
  maxValue,
  useMoneyFormat,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState(value ?? "");
  const decimals = useMoneyFormat ? 2 : 8;

  useEffect(() => {
    if (value !== inputValue) {
      const fixed = new Decimal(value).toFixed(decimals);
      setInputValue(fixed);
    }
  }, [value, inputValue]);

  const handleChange = (e) => {
    const val = e.target.value;
    const regex = new RegExp(`^\\d*(\\.\\d{0,${decimals}})?$`);

    if (val === "" || regex.test(val)) {
      try {
        if (val !== "" && maxValue && new Decimal(val).gt(maxValue)) return;
      } catch {
        return; // на случай, если val всё-таки невалиден
      }

      setInputValue(val);
      onChange?.(val);
    }
  };

  const handleBlur = () => {
    if (inputValue === "") {
      const fixedZero = new Decimal(0).toFixed(decimals);
      setInputValue(fixedZero);
      onChange?.(fixedZero);
      return;
    }
    try {
      const fixed = new Decimal(inputValue).toFixed(decimals);
      setInputValue(fixed);
      onChange?.(fixed);
    } catch {
      setInputValue("0");
      onChange?.("0");
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      pattern={`\\d*(\\.\\d{0,${decimals}})?`}
      className={styles.inputField}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default TradeInput;

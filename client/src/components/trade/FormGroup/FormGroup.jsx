  import { useState, useEffect, useRef, useMemo, useCallback } from "react";
  import { observer } from "mobx-react-lite";
  import styles from "./FormGroup.module.css";
  import TradeInput from "../TradeInput/TradeInput";

  const FormGroup = observer(
    ({
      label,
      value,
      onChangeInput,
      useMoneyFormat,
      onChangeSelect,
      options = [],
      isBuying,
      isAuth,
      maxValue,
      selectedValue
    }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [search, setSearch] = useState("");
      const [selectedOption, setSelectedOption] = useState(null);
      const wrapperRef = useRef(null);

      useEffect(() => {
        if (!selectedOption && options.length > 0) return; 
        if (!options.length || !selectedValue) return;

        const matched = options.find(
          (opt) => opt.value.symbol === selectedValue.symbol
        );

        if (matched && matched.value.symbol !== selectedOption?.value?.symbol) {
          setSelectedOption(matched);
        }
      }, [selectedValue, options]);

      useEffect(() => {
        if (!selectedOption && options.length > 0) {
          setSelectedOption(options[0]);
          onChangeSelect?.(options[0].value);
        }
      }, [options]);

      useEffect(() => {
        const handleClickOutside = (e) => {
          if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setIsOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const filteredOptions = useMemo(() => {
        const s = search.toLowerCase();
        return options.filter((o) => o.label.toLowerCase().includes(s));
      }, [options, search]);

      const handleSelect = useCallback((option) => {
        setSelectedOption(option);
        onChangeSelect?.(option.value);
        setIsOpen(false);
        setSearch("");
      }, [onChangeSelect]);

      return (
        <div className={styles.group} ref={wrapperRef}>
          <label>{label}</label>
          <div className={styles.inputWrapper}>
            <TradeInput
              placeholder="Amount"
              value={value}
              onChange={(val) => {
                onChangeInput?.(val);
              }}
              maxValue={maxValue}
              useMoneyFormat={useMoneyFormat}
              disabled={!isAuth && !isBuying}
            />

            {options.length ? (
              <div className={styles.select}>
                <div
                  className={styles.selectControl}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedOption ? selectedOption.label : "Select a currency"}
                  <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
                </div>

                {isOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.search}>
                      <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <ul className={styles.options}>
                      {filteredOptions.map((option) => (
                        <li
                          key={option.id}
                          onClick={() => handleSelect(option)}
                          className={styles.option}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (  useMoneyFormat ? <div className={styles.select}><p className={styles.selectControl}>USD</p></div> :
              !isBuying && (
                <p className={styles.errorMessage}>{isAuth ? "You have no crypto to sell" : ""}</p>
              )
            )}
          </div>
        </div>
      );
    }
  );

  export default FormGroup;
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../../..";

import styles from "./Search.module.css";

const Search = observer(() => {
  const { cryptos } = useContext(Context);
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    const searchedCryptos = cryptos.list.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase())
    );

    cryptos.setPage(1);
    cryptos.setFilteredList(searchedCryptos);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder="Search for cryptocurrency..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
});

export default Search;

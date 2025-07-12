import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";

import styles from "./Sort.module.css";
import { Context } from "../../..";

const Sort = observer(() => {
  const { cryptos } = useContext(Context);
  const [sortDirection, setSortDirection] = useState({
    name: "none",
    price: "none",
    change: "none",
  });

  const nextDirection = (currentDirection) => {
    if (currentDirection === "none") return "desc";
    if (currentDirection === "desc") return "asc";
    return "none";
  };

  const handleSort = (sortParameter) => {
    const currentDirection = sortDirection[sortParameter];
    const newDirection = nextDirection(currentDirection);

    // Copy actual array
    const baseList = cryptos.filteredList.length
      ? cryptos.filteredList
      : cryptos.list;

    // When no direction reset sorting
    if (newDirection === "none") {
      cryptos.setSortedList([]);
      setSortDirection((prev) => ({
        ...prev,
        [sortParameter]: newDirection,
      }));
      return;
    }

    // Sort by parameter and sort direction
    const sortedList = [...baseList];
    if (sortParameter === "name") {
      sortedList.sort((a, b) =>
        currentDirection === "desc"
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name)
      );
    }

    if (sortParameter === "price") {
      sortedList.sort((a, b) =>
        currentDirection === "desc" ? b.price - a.price : a.price - b.price
      );
    }

    if (sortParameter === "change") {
      sortedList.sort((a, b) =>
        currentDirection === "desc"
          ? b.change24h - a.change24h
          : a.change24h - b.change24h
      );
    }

    // Actualize the list
    cryptos.setSortedList(sortedList);

    // Change sort direction
    setSortDirection((prev) => ({
      ...prev,
      [sortParameter]: newDirection,
    }));

    cryptos.setPage(1);
  };

  return (
    <ul className={styles.sort}>
      <li>
        <button
          onClick={() => {
            handleSort("name");
          }}
        >
          Name&nbsp;
          {sortDirection.name === "none"
            ? "-"
            : sortDirection.name === "asc"
            ? "↑"
            : "↓"}
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            handleSort("price");
          }}
        >
          Price&nbsp;
          {sortDirection.price === "none"
            ? "-"
            : sortDirection.price === "asc"
            ? "↑"
            : "↓"}
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            handleSort("change");
          }}
        >
          Change&nbsp;
          {sortDirection.change === "none"
            ? "-"
            : sortDirection.change === "asc"
            ? "↑"
            : "↓"}
        </button>
      </li>
    </ul>
  );
});

export default Sort;

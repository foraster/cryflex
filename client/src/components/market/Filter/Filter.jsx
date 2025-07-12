import { observer } from 'mobx-react-lite';
import { useContext } from 'react'
import { Context } from '../../..';
import styles from './Filter.module.css'

const Filter = observer(() => {
    const { cryptos } = useContext(Context);

    const handleFilter = (filter) => {
        if (filter === "all") {
          cryptos.setFilteredList([]);
          cryptos.setSortedList([]);
          return;
        }
    
        // Filter array by parameter
        const filteredCryptos = cryptos.list.filter((crypto) =>
          crypto.tags.includes(filter)
        );
    
        cryptos.setFilteredList(filteredCryptos);
        cryptos.setSortedList([]);
        cryptos.setPage(1);
      };


  return (
    <ul className={styles.filter}>
        <li>
            <button
            onClick={() => {
                handleFilter("all");
            }}
            >
            All
            </button>
        </li>
        <li>
            <button href="/market" onClick={() => handleFilter("payments")}>
            Payments
            </button>
        </li>
        <li>
            <button onClick={() => handleFilter("real-world-assets")}>
            RWA
            </button>
        </li>
        <li>
            <button onClick={() => handleFilter("solana-ecosystem")}>
            Solana
            </button>
        </li>
        <li>
            <button href="/market" onClick={() => handleFilter("memes")}>
            Meme
            </button>
        </li>
        </ul>
  )
});

export default Filter
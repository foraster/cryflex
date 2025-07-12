import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { getList } from "../../http/cryptoAPI";
import { getOwnedCryptos, getPurchases } from "../../http/userAPI";
import { TRADE_ROUTE } from "../../utils/consts";

import Loading from "../../components/common/Loading";
import PortfolioTable from "../../components/portfolio/PortfolioTable/PortfolioTable";
import Pagination from "../../components/common/Pagination/Pagination";
import styles from "./Portfolio.module.css";
import { toFiat } from "../../utils/money";

const Portfolio = observer(() => {
  const { user, cryptos } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showPurchases, setShowPurchases] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!cryptos.list.length) {
          const data = await getList();
          cryptos.setCryptos(data);
        }
        if (user.user?.id) {
          const portfolio = await getOwnedCryptos(user.user.id);
          user.setOwnedCryptos(portfolio.ownedCryptos);
          const purchases = await getPurchases(user.user.id);
          user.setPurchases(purchases);
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cryptos, user]);

  const cryptoMap = useMemo(() => {
    return cryptos.list.reduce((map, crypto) => {
      map[crypto.symbol] = crypto;
      return map;
    }, {});
  }, [cryptos.list]);

  const getCryptoPrice = (symbol) => cryptoMap[symbol]?.price || 0;
  const getCryptoName = (symbol) => cryptoMap[symbol]?.name || "N/A";

  const totalCost = user.ownedCryptos.reduce((acc, crypto) => {
    return acc + getCryptoPrice(crypto.symbol) * crypto.amount;
  }, 0);

  const cryptoIcons = useMemo(() => {
    const context = require.context("../../img/crypto/", false, /\.png$/);
    const icons = {};
    context.keys().forEach((key) => {
      const name = key.replace("./", "").replace(".png", "");
      icons[name] = context(key);
    });
    return icons;
  }, []);

  const getCryptoIcon = (symbol) => cryptoIcons[symbol] || cryptoIcons["default"];

  const columns = showPurchases
    ? [
        { title: "Name", key: "name" },
        { title: "Amount", key: "amount" },
        { title: "Price", key: "price" },
        { title: "Transaction Value", key: "transactionValue" },
        { title: "Activity", key: "activity" },
        { title: "Date", key: "date" },
        { title: "At", key: "at" },
      ]
    : [
        { title: "Name", key: "name" },
        { title: "Amount", key: "amount" },
        { title: "Price", key: "price" },
        { title: "Cost", key: "cost" },
      ];

  const tableData = showPurchases
    ? [...user.purchases].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [...user.ownedCryptos].sort((a, b) => a.id - b.id);

  const limit = user.portfolioLimit;
  const startIndex = (user.portfolioPage - 1) * limit;
  const endIndex = startIndex + limit;

  const portfolioData = {
    list: tableData,
    filteredList: [],
    limit: limit,
    page: user.portfolioPage,
    setPage: (p) => user.setPortfolioPage(p),
  };

  const currentTableData = tableData.slice(startIndex, endIndex);

  return (
    <main className={styles.wrapper}>
      {loading && <Loading />}
      <div className={styles.container}>
        <PortfolioTable
          data={currentTableData}
          columns={columns}
          getCryptoName={getCryptoName}
          getCryptoPrice={getCryptoPrice}
          getCryptoIcon={getCryptoIcon}
          type={showPurchases ? "purchases" : "assets"}
        />
        {!showPurchases && (
          <div className={styles.totalCost}>
            Total cost: {toFiat(totalCost)}$
          </div>
        )}
        {/* Button group for toggling purchase history and navigating to trade page */}
        <div className={styles.buttonGroup}>
          <div className={styles.controls}>
            <button
              onClick={() => {
                setShowPurchases(!showPurchases);
                user.setPortfolioPage(1);
              }}
            >
              {showPurchases ? "Hide " : "View "}purchase history
            </button>
            <button onClick={() => navigate(TRADE_ROUTE)}>Buy / Sell crypto</button>
          </div>
          {/* Pagination component for navigating through portfolio data */}
          <div className={styles.pagination}>
            <Pagination list={portfolioData} />
          </div>
        </div>
      </div>
    </main>
  );
});

export default Portfolio;
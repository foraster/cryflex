import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { ReactComponent as TradeIcon } from "../../../img/icons/trade icon.svg";
import { ReactComponent as MarketIcon } from "../../../img/icons/market icon.svg";
import {
  LOGIN_ROUTE,
  MARKET_ROUTE,
  PORTFOLIO_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  TRADE_ROUTE,
} from "../../../utils/consts";
import { Context } from "../../../index";
import styles from "./NavBar.module.css";
import BurgerButton from "./BurgerButton";
import { toFiat } from "../../../utils/money";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const isAuth = user.isAuth;

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarRow}>
        <div className={styles.navbarLeft}>
          <NavLink to="/" className={styles.navbarTitle}>
            CRYFLEX
          </NavLink>
          <div className={styles.primaryLinks}>
            <NavLink to={TRADE_ROUTE}>
              Trade
              <TradeIcon
                className={styles.icon}
                aria-hidden="true"
                focusable="false"
              />
            </NavLink>
            <NavLink to={MARKET_ROUTE}>
              Market
              <MarketIcon
                className={styles.icon}
                aria-hidden="true"
                focusable="false"
              />
            </NavLink>
          </div>
        </div>

        <div className={styles.navbarRight}>
          {isAuth ? (
            <>
              <span className={styles.balance}>
                Balance: {toFiat(user.balance)}$
              </span>
              <NavLink to={PORTFOLIO_ROUTE}>Portfolio</NavLink>
              <NavLink to={PROFILE_ROUTE}>Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink to={LOGIN_ROUTE} className={styles.loginBtn}>
                Log In
              </NavLink>
              <NavLink to={REGISTRATION_ROUTE} className={styles.registerBtn}>
                Register
              </NavLink>
            </>
          )}
        </div>

        <button className={styles.menuButton}>
          {" "}
          <BurgerButton />
        </button>
      </div>
    </header>
  );
});

export default NavBar;

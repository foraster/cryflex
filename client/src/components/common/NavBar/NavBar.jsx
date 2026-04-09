import { useContext, useState } from "react";
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
import Menu from "../Menu/Menu";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const isAuth = user.isAuth;

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className={styles.navbar}>
      {openMenu && <Menu openMenu={openMenu} setOpen={setOpenMenu} />}
      <div className={styles.navbarRow}>
        <div className={styles.navbarLeft}>
          <NavLink to="/" className={styles.navbarTitle} onClick={() => setOpenMenu(false)}>
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

        <button 
          className={styles.menuButton}
          onClick={() => {
            setOpenMenu(!openMenu)
             console.log(openMenu)}
            }
        >
          {" "}
          <BurgerButton />
        </button>
      </div>
    </header>
  );
});

export default NavBar;

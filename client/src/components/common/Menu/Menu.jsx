import styles from "./Menu.module.css";
import {
  LOGIN_ROUTE,
  MARKET_ROUTE,
  PORTFOLIO_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  TRADE_ROUTE,
} from "../../../utils/consts";
import { NavLink } from "react-router-dom";
import { toFiat } from "../../../utils/money";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../..";

const Menu = observer(({openMenu, setOpen}) => {
    const { user } = useContext(Context);
    const isAuth = user.isAuth;

  return (
        <ul className={styles.menu} >
            <li>
              <NavLink to={TRADE_ROUTE} onClick={() => setOpen(false)}>
              Trade
              </NavLink>
            </li>
            <li>
              <NavLink to={MARKET_ROUTE} onClick={() => setOpen(false)}>
              Market
            </NavLink>
            </li>
            <div className={styles.navbarRight}>
              {isAuth ? (
                <>
                  <li>
                    <NavLink to={PORTFOLIO_ROUTE} onClick={() => setOpen(false)}>
                      Portfolio
                    </NavLink>
                    </li>
                  <li>
                      <NavLink to={PROFILE_ROUTE} onClick={() => setOpen(false)}>
                        Profile
                      </NavLink>
                    </li>
                  <li>
                    <span className={styles.balance}>
                    Balance: {toFiat(user.balance)}$
                  </span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to={LOGIN_ROUTE} className={styles.loginBtn} onClick={() => setOpen(false)}>
                    Log In
                  </NavLink>
                  </li>
                  <li><NavLink to={REGISTRATION_ROUTE} className={styles.registerBtn} onClick={() => setOpen(false)}> 
                    Register
                  </NavLink></li>
                </>
              )}
            </div>
        </ul>
  )
})

export default Menu
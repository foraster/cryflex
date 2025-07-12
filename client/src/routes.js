import Portfolio from "./pages/Portfolio/Portfolio";
import {
    HOMEPAGE_ROUTE,
    LOGIN_ROUTE,
    MARKET_ROUTE,
    PORTFOLIO_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    TRADE_ROUTE
} from "./utils/consts";
import Home from "./pages/Home/Home";
import Market from "./pages/Market/Market";
import Trade from "./pages/Trade/Trade";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

export const authRoutes = [
    {
        path: PORTFOLIO_ROUTE,
        Component: Portfolio
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
]

export const publicRoutes = [
    {
        path: HOMEPAGE_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Register
    },
    {
        path: MARKET_ROUTE,
        Component: Market
    },
    {
        path: TRADE_ROUTE,
        Component: Trade
    },
]
import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.css'

import UserStore from "./store/UserStore";
import CryptoStore from "./store/CryptoStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        cryptos: new CryptoStore(),
    }}>
        <App />
    </Context.Provider>
);
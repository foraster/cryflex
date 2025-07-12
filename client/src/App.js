import { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

import NavBar from "./components/common//NavBar/NavBar";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { check, getBalance } from "./http/userAPI"
import Footer from './components/common/Footer/Footer';
import './styles/theme.css'


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

   useEffect(() => {
    check()
        .then(data => {
            user.setUser(data);
            user.setIsAuth(true);
            getBalance(data.id).then(balance_units => {
                console.log("BALANCE", balance_units)
                user.setBalance(balance_units);
            });
        })
        .catch(() => {
            user.setIsAuth(false);
        })
        .finally(() => setLoading(false));
}, [user]);

    if (loading) {
        return <div/>
    }

  return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter/>
        <Footer/>
    </BrowserRouter>
  );
});

export default App;

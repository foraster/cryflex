import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { REGISTRATION_ROUTE } from "../../utils/consts";
import styles from "./Login.module.css";

const Login = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(identifier, password);
      user.setUser(user);
      user.setIsAuth(true);
      navigate("/");
      window.location.reload();
    } catch (e) {
      alert(e.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <main className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.title}>Welcome back!</div>

        <div className={styles.group}>
          <label>Email or Username</label>
          <input
            className={styles.field}
            type="text"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Password</label>
          <input
            className={styles.field}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.btns}>
          <NavLink className={styles.link} to={REGISTRATION_ROUTE}>
            Create an account
          </NavLink>
          <button className={styles.btn} onClick={handleLogin}>
            Log in
          </button>
        </div>
      </div>
    </main>
  );
});

export default Login;
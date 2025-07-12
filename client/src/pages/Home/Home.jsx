import { Context } from "../../index";
import { useContext, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../../utils/consts";

const Home = () => {
  const { user } = useContext(Context);
  const isAuth = user.isAuth;
  const navigate = useNavigate();
  const registeredUsers = 0;
  const [email, setEmail] = useState("");

  const start = (email) => {
    navigate(REGISTRATION_ROUTE + "?email=" + email);
  };

  return (
    <main className={styles.home}>
      <div className="container">
        <div className={styles.homeHeader}>
          <header className={styles.greeting}>
            
    <div className={styles.left}></div>
            {isAuth ? (
              <>
                <h1 className={styles.mainHeading}>Welcome to <span className="green">Cryflex</span></h1>
                <section className={styles.content}>
                  <div className={styles.description}>
                    <p>Trade virtual assets with real cryptocurrency rates.</p>
                    <p>Experience the speed and convenience of transactions without risks.</p>
                    {!isAuth && <p>Trusted by {registeredUsers} users already!</p>}
                  </div>
                </section>
              </>
            ) : (
              <>
                <h1 className={styles.mainHeading}>
                  Start trading with <br/>
                  <span className="green">Cryflex</span> today!
                </h1>
                <div className={styles.greetingAuth}>
                <form className={styles.form} onSubmit={(e) => {
                  e.preventDefault();
                  start(email);
                }}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">Start</button>
                </form>
              </div>
              </>
            )}
          </header>
  
          <section className={styles.benefits} aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="visually-hidden">Why Cryflex</h2>
        <ul className={styles.benefitList}>
          <li>
            <strong>⚡ Instant execution</strong><br />
            Simulate real-time trades with no delays or risks.
          </li>
          <li>
            <strong>📚 Learn by doing</strong><br />
            Understand how crypto markets work through practice.
          </li>
          <li>
            <strong>🔒 Safe and anonymous</strong><br />
            No signup, no wallet needed — just start learning.
          </li>
        </ul>
      </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
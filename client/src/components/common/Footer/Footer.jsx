import styles from './Footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.container} aria-label="Footer navigation">

          <h2 className={styles.title}>CRYFLEX</h2>
        

        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Follow Us</h3>
            <ul>
              <li><a href="https://x.com/cryflex" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
              <li><a href="https://facebook.com/cryflex" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com/cryflex" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://t.me/cryflex" target="_blank" rel="noopener noreferrer">Telegram</a></li>
            </ul>
          </div>
  
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Support</h3>
            <ul>
              <li><NavLink to="/info">About Us</NavLink></li>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
              <li><NavLink to="/faq">FAQ</NavLink></li>
            </ul>
          </div>
  
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul>
              <li><NavLink to="/terms">Terms of Use</NavLink></li>
              <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={styles.subtitle}>
        <small>©2025 Cryflex. All rights reserved</small>
      </div>
    </footer>
  )
}

export default Footer
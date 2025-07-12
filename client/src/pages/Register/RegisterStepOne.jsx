import { NavLink } from "react-router-dom";
import styles from "./Register.module.css";

const RegisterStepOne = ({
  formData,
  setFormData,
  showHint,
  setShowHint,
  passwordError,
  setPasswordError,
  onNext,
}) => {
  const { email, username, password, secondPassword } = formData;

  return (
    <>
      <div className={styles.header}>
        <p>
          Welcome to <span className="light-green">Cryflex!</span>
        </p>
        <p className={styles.subtitle}>Create an account:</p>
      </div>

      <div className={styles.group}>
        <label>Email</label>
        <input
          placeholder="Email"
          className={styles.field}
          type="email"
          value={email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
      </div>

      <div className={styles.group}>
        <label>Username</label>
        <input
          className={styles.field}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
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
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          onFocus={() => setShowHint(true)}
          onBlur={() => setShowHint(false)}
          required
        />
        {(showHint || password.length > 0) && (
          <p
            className={`${styles.hint} ${
              password.length >= 8 &&
              /[A-Z]/.test(password) &&
              /[a-z]/.test(password)
                ? "valid"
                : "invalid"
            }`}
          >
            Password must contain at least 8 characters with uppercase and
            lowercase letters
          </p>
        )}
        <input
          className={styles.field}
          type="password"
          placeholder="Repeat password"
          value={secondPassword}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              secondPassword: e.target.value,
            }));
            setPasswordError(password !== e.target.value);
          }}
          required
        />
        {passwordError && <p className={`${styles.hint} invalid`}>Passwords do not match</p>}
      </div>


      <div className={styles.btns}>
        <NavLink className={styles.link} to={'/login'}>
          Already have an account?
        </NavLink>
        <button className={styles.btn} onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default RegisterStepOne;
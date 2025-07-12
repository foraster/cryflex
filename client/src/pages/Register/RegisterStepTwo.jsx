import styles from "./Register.module.css";
import countries from "../../utils/countries";
import languages from "../../utils/languages";
import { days, months, years } from "../../utils/consts";

const RegisterStepTwo = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
}) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    gender,
    country,
    language,
    selectedDay,
    selectedMonth,
    selectedYear,
  } = formData;

  return (
    <>
      <div className={styles.header}>
        <p className={styles.subtitle}>Please, enter your personal info:</p>
      </div>

      <div className={styles.groupRow}>
        <div className={styles.group}>
          <label>
            First name <span className="red">*</span>
          </label>
          <input
            className={styles.field}
            placeholder="First name"
            type="text"
            value={firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            required
          />
        </div>

        <div className={styles.group}>
          <label>
            Last name <span className="red">*</span>
          </label>
          <input
            className={styles.field}
            placeholder="Last name"
            type="text"
            value={lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            required
          />
        </div>
      </div>

      <div className={styles.group}>
        <label>Phone</label>
        <input
          className={styles.field}
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
      </div>

      <div className={styles.group}>
        <label>Address</label>
        <input
          className={styles.field}
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>

      <div className={styles.group}>
        <label>Gender</label>
        <select
          className={styles.select}
          value={gender}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, gender: e.target.value }))
          }
        >
          <option value="not chosen">Not chosen</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className={styles.group}>
        <label>Language</label>
        <select
          className={styles.select}
          value={language}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, language: e.target.value }))
          }
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label>Country</label>
        <select
          className={styles.select}
          value={country}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, country: e.target.value }))
          }
        >
          {countries.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label>Date of Birth</label>
        <div className={styles.dateGroup}>
          <select
            className={styles.select}
            value={selectedDay}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                selectedDay: Number(e.target.value),
              }))
            }
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            className={styles.select}
            value={selectedMonth}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                selectedMonth: Number(e.target.value),
              }))
            }
          >
            {months.map((month) => (
              <option key={month.number} value={month.number}>
                {month.name}
              </option>
            ))}
          </select>

          <select
            className={styles.select}
            value={selectedYear}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                selectedYear: Number(e.target.value),
              }))
            }
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.btns}>
        <button className={styles.link} onClick={onBack}>
          Back
        </button>
        <button className={styles.btn} onClick={onSubmit}>
          Register
        </button>
      </div>
    </>
  );
};

export default RegisterStepTwo;
import styles from "./Profile.module.css";
import countries from "../../utils/countries";
import languages from "../../utils/languages";
import { months, years } from "../../utils/consts";
import { useEffect, useState } from "react";

const ProfileForm = ({ formData, setFormData, isEditable }) => {
  const {
    username, email, firstName, lastName, phone,
    address, gender, country, language,
    selectedDay, selectedMonth, selectedYear,
    registerDate
  } = formData;

  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    setAvailableDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    if (selectedDay > daysInMonth) {
      setFormData(prev => ({ ...prev, selectedDay: daysInMonth }));
    }
  }, [selectedMonth, selectedYear, selectedDay, setFormData]);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleNumberChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: Number(e.target.value) }));
  };

  return (
    <section className={styles.info}>
      <div className={styles.column}>
        <div className={`${styles.picture} ${isEditable ? "pointer" : ""}`} onClick={isEditable ? (() => alert("Profile picture change is not implemented yet")) : undefined}>
          <img src={require("../../img/icons/user_default.png")} alt="Profile" />
        </div>
        <div className={styles.group}>
          <div>
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              disabled={!isEditable}
              value={firstName}
              onChange={handleChange("firstName")}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              disabled={!isEditable}
              value={lastName}
              onChange={handleChange("lastName")}
            />
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            disabled={!isEditable}
            value={username}
            onChange={handleChange("username")}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            disabled={!isEditable}
            value={email}
            onChange={handleChange("email")}
          />
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.row}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            disabled={!isEditable}
            value={phone}
            onChange={handleChange("phone")}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            disabled={!isEditable}
            value={address}
            onChange={handleChange("address")}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            disabled={!isEditable}
            value={country}
            onChange={handleChange("country")}
            className={styles.select}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <div className={styles.row}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              disabled={!isEditable}
              value={gender}
              onChange={handleChange("gender")}
              className={styles.select}
            >
              <option value="not chosen">Not chosen</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className={styles.row}>
            <label htmlFor="language">Language</label>
            <select
              id="language"
              disabled={!isEditable}
              value={language}
              onChange={handleChange("language")}
              className={styles.select}
            >
              {languages.map((l) => (
                <option key={l.code} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label>Date of Birth</label>
          <div className={styles.date}>
            <select
              value={selectedDay}
              onChange={handleNumberChange("selectedDay")}
              disabled={!isEditable}
              className={styles.select}
            >
              {availableDays.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={handleNumberChange("selectedMonth")}
              disabled={!isEditable}
              className={styles.select}
            >
              {months.map((m) => (
                <option key={m.number} value={m.number}>{m.name}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={handleNumberChange("selectedYear")}
              disabled={!isEditable}
              className={styles.select}
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="light-green">Member since: {registerDate}</p>
      </div>
    </section>
  );
};

export default ProfileForm;
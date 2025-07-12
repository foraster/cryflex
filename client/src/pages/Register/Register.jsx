import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import NotifyModal from "../../components/common/NotifyModal/NotifyModal";
import { Context } from "../../index";
import { validateEmail, validatePassword } from "../../utils/helpers";
import { validateUser, registration } from "../../http/userAPI";
import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import styles from "./Register.module.css";
import { days, months, years } from "../../utils/consts";

const Register = observer(() => {
  const [showHint, setShowHint] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

const [formData, setFormData] = useState({
  email: params.get("email") || "",
  username: "",
  password: "",
  secondPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  gender: "not chosen",
  country: "",
  language: "English",
  selectedDay: days[0],
  selectedMonth: months[0].number,
  selectedYear: years[0],
});

  const handleNextStep = async () => {
    const { username, email, password, secondPassword } = formData;

    if (!email || !validateEmail(email)) return show("Please enter a valid email");
    if (!username) return show("Please enter your username");
    if (!password || !secondPassword) return show("Please enter your password");
    if (password !== secondPassword) return show("Passwords do not match");
    if (!validatePassword(password)) return show("Password is invalid");

    try {
      const response = await validateUser(email, username, password);
      if (response.success) setStep(2);
    } catch (error) {
      if (error.response?.data?.message) {
        show(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleRegister = async () => {
    const {
      username, email, password, firstName, lastName,
      phone, address, gender, country, language,
      selectedDay, selectedMonth, selectedYear
    } = formData;
    console.log("formData", formData);

    if (!firstName) return show("Please enter your first name");
    if (!lastName) return show("Please enter your last name");

    try {
      const dateOfBirth = `${selectedYear}-${selectedMonth}-${selectedDay}`;
      console.log("dateOfBirth", dateOfBirth);
      await registration({
        username, email, password, firstName, lastName,
        phone, address, gender, country, language, dateOfBirth,
      });

      user.setUser(user);
      user.setIsAuth(true);
      navigate("/");
      window.location.reload();
    } catch (e) {
      show(e.response?.data?.message || "Registration failed");
    }
  };

  const show = (msg) => {
    setMessage(msg);
    setShowModal(true);
  };

  return (
    <main className={styles.auth}>
      <div className={styles.container}>
        <NotifyModal
          title="Cannot continue"
          message={message}
          active={showModal}
          setActive={setShowModal}
          error
        />
        {step === 1 ? (
          <RegisterStepOne
            formData={formData}
            setFormData={setFormData}
            showHint={showHint}
            setShowHint={setShowHint}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            onNext={handleNextStep}
            />
        ) : (
          <RegisterStepTwo
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(1)}
            onSubmit={handleRegister}
          />
        )}
      </div>
    </main>
  );
});

export default Register;
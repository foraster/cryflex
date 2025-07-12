import { useState } from "react";
import { getPersonalInfo, modifyUser } from "../../http/userAPI";

export const useProfileData = (userId) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    gender: "",
    country: "",
    language: "",
    selectedDay: 1,
    selectedMonth: 1,
    selectedYear: 1980,
    registerDate: "",
  });
  const [initialData, setInitialData] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const load = async () => {
    const data = await getPersonalInfo(userId);
    const month = parseInt(data.dateOfBirth.slice(5, 7));
    const day = parseInt(data.dateOfBirth.slice(8, 10));
    const year = parseInt(data.dateOfBirth.slice(0, 4));

    setInitialData(data);
    setFormData({
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      gender: data.gender,
      country: data.country,
      language: data.language,
      selectedDay: day,
      selectedMonth: month,
      selectedYear: year,
      registerDate: data.registerDate.slice(0, 10),
    });
  };

  const save = async () => {
    if (initialData === formData) {
      setIsEditable(false);
      return
    }
    const dateOfBirth = `${formData.selectedYear}-${formData.selectedMonth}-${formData.selectedDay}`;
    const result = await modifyUser({
      userId,
      ...formData,
      dateOfBirth,
    });
    setIsEditable(false);
    return result.message;
  };

  const cancel = () => {
    setFormData({
      username: initialData.username,
      email: initialData.email,
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      phone: initialData.phone,
      address: initialData.address,
      gender: initialData.gender,
      country: initialData.country,
      language: initialData.language,
      selectedDay: Number(initialData.dateOfBirth.slice(8, 10)),
      selectedMonth: Number(initialData.dateOfBirth.slice(5, 7)),
      selectedYear: Number(initialData.dateOfBirth.slice(0, 4)),
      registerDate: initialData.registerDate.slice(0, 10),
    });
    setIsEditable(false);
  };

  return {
    formData,
    setFormData,
    isEditable,
    setIsEditable,
    load,
    save,
    cancel,
  };
};

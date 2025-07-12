import { $host } from "./index";

export const validateUser = async(email, username, password) => {
  const {data} = await $host.post("api/user/validate", {
    email,
    username, 
    password,
  });
  return data;
}

export const registration = async (registrationData) => {
  const { data } = await $host.post("api/user/registration", registrationData);
  return data;
};

export const login = async (identifier, password) => {
  const { data } = await $host.post("api/user/login", { identifier, password });
  return data;
};

export const logout = async () => {
  const { data } = await $host.post("api/user/logout");
  return data;
}

export const modifyUser = async (personalData) => {
  const { data } = await $host.post(`api/user/modify`, personalData);
  return data;
};

export const check = async () => {
  const { data } = await $host.get("api/user/auth");
  return data;
};

export const getPersonalInfo = async (userId) => {
  const { data } = await $host.get(`api/user/${userId}/info`);
  return data;
};

export const getBalance = async (userId) => {
  const { data } = await $host.get(`api/user/${userId}/balance`);
  return data.balance_units;
};

export const getOwnedCryptos = async (userId) => {
  const { data } = await $host.get(`api/user/${userId}/portfolio`);

  return data;
};

export const getPurchases = async (userId) => {
  const { data } = await $host.get(`api/user/${userId}/purchases`)
  return data;
}

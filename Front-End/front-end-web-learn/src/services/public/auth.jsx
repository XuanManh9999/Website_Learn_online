import api from "../../axios/nontoken/AxiosConfig";

export const apiLogin = async (body) => {
  try {
    const response = await api.post("/auth/login", body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const apiRegister = async (body) => {
  try {
    const response = await api.post("/auth/register", body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const verifyOTPRegister = async (body) => {
  try {
    const response = await api.post("/auth/verify-otp-register", body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const apiForgotPassword = async (body) => {
  try {
    const response = await api.post("/auth/forgot-password", body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const socialLogin = async (body) => {
  try {
    const response = await api.post("/auth/social-login", body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const verifyOTPForgotPassword = async (body) => {
  try {
    const response = await api.post("auth/verify-otp-forgot-password", body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

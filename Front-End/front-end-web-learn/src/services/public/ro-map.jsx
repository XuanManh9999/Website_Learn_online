import api from "../../axios/nontoken/AxiosConfig";
export const getMaps = async () => {
  try {
    const response = await api.get("/api/v1/maps");
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

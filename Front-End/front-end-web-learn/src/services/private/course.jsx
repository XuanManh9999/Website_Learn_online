import api from "../../axios/token/AxiosToken";

export const apiGetDataCourseType = async () => {
  try {
    const response = await api.get("/api/v1/course-type");
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const apiGetMapData = async () => {
  try {
    const response = await api.get("/api/v1/maps/data");
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const apiCreateCourse = async (body) => {
  try {
    const response = await api.post("/api/v1/courses", body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const apiGetAllCourse = async (page, limit) => {
  try {
    const response = await api.get(
      `/api/v1/courses?page=${page}&limit=${limit}`
    );
    return response?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteCourseById = async (idCourse) => {
  try {
    const response = await api.delete(`/api/v1/courses/${idCourse}`);
    return response?.data;
  } catch (error) {
    return error.response.data;
  }
};

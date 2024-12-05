import api from "../../axios/nontoken/AxiosConfig";
import apiToken from "../../axios/token/AxiosToken";

export const getCourses = async (IdUser) => {
  try {
    let url;
    if (IdUser) {
      url = `/api/v1/courses/all?IdUser=${IdUser}`;
    } else {
      url = `/api/v1/course/all`;
    }
    const response = await apiToken.get(url);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const userRegisterCourse = async (IdUser, IdCourse) => {
  try {
    let url = `/api/v1/users/register-course`;
    const response = await apiToken.post(url, { IdUser, IdCourse });
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const userCompeleteVideo = async (idUser, idVideo) => {
  try {
    let url = `/api/v1/users/dispatch-done-video`;
    const response = await apiToken.post(url, { idUser, idVideo });
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getCoursesDB = async () => {
  try {
    let url = `/api/v1/course-type/all`;
    const response = await api.get(url);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};
export const getCourseById = async (idCourse) => {
  try {
    let url = `/api/v1/courses/${idCourse}`;
    const response = await api.get(url);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getCourseByIdUserAndIdCourse = async (idCourse, idUser) => {
  try {
    let url = `/api/v1/courses/${idCourse}/${idUser}`;
    const response = await apiToken.get(url);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const checkUserRegisterCourse = async (body) => {
  try {
    let url = `/api/v1/users/check-register-course`;
    const response = await apiToken.post(url, body);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

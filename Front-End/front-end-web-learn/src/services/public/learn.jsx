import api from "../../axios/nontoken/AxiosConfig";

export const getCourses = async (IsShowChapter = 0, IdUser, IdCourse) => {
  try {
    let url = `/api/v1/course/all?IsShowChapter=${IsShowChapter}`;
    if (IdUser) {
      url += "&IdUser=" + IdUser;
    }
    if (IdCourse) {
      url += "&IdCourse=" + IdCourse;
    }
    const response = await api.get(url);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const userRegisterCourse = async (idUser, idCourse) => {
  try {
    let url = `/api/v1/users/register-course`;
    const response = await api.post(url, { idUser, idCourse });
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const userCompeleteVideo = async (idUser, idVideo) => {
  try {
    let url = `/api/v1/users/dispatch-done-video`;
    const response = await api.post(url, { idUser, idVideo });
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

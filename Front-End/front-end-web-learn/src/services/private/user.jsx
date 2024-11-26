import api from "../../axios/token/AxiosToken";
const fetchUsers = async (page = 1, limit = 5) => {
  try {
    const response = await api.get(`/api/v1/users?page=${page}&limit=${limit}`); // Đường dẫn tương đối với baseURL
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

const getUserById = async (idUser) => {
  try {
    const response = await api.get(`/api/v1/users/${idUser}`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

const createUser = async (body) => {
  try {
    const response = await api.post("/api/v1/users", body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

const updateUser = async (body, idUser) => {
  try {
    const response = await api.put(`/api/v1/users/${idUser}`, body);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

const deleteUser = async (idUser) => {
  try {
    const response = await api.delete(`/api/v1/users/${idUser}`);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export { fetchUsers, createUser, updateUser, getUserById, deleteUser };

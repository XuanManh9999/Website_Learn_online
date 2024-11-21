import api from "../../axios/token/AxiosToken";
// Ví dụ: Gọi một API để lấy danh sách người dùng
const fetchUsers = async (page = 1, limit = 5) => {
  try {
    const response = await api.get(`/api/v1/users?page=${page}&limit=${limit}`); // Đường dẫn tương đối với baseURL
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export { fetchUsers };

import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080" // Cần thêm http:// để axios nhận diện đúng địa chỉ
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Thêm token vào headers
        }
        return config; // Trả về config để tiếp tục request
    },
    (error) => {
        return Promise.reject(error); // Xử lý lỗi trước khi gửi request
    }
);

// Add a response interceptor để xử lý khi token hết hạn hoặc không hợp lệ
api.interceptors.response.use(
    (response) => {
        return response; // Trả về kết quả nếu thành công
    },
    (error) => {
        // Kiểm tra nếu lỗi là do token hết hạn hoặc không hợp lệ
        if (error.response && error.response.status === 401) {
            // Token không hợp lệ hoặc hết hạn, thực hiện đăng xuất hoặc refresh token
            localStorage.removeItem("token"); // Xóa token cũ
            window.location.href = "/login"; // Chuyển hướng về trang login
        }
        return Promise.reject(error); // Trả về lỗi để xử lý tiếp
    }
);

export default api;

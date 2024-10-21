import axios from 'axios';

const api = axios.create({
    baseURL: "localhost:8080/api/v1"
})

// Add a request interceptor

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return token
    },
    (error) => Promise.reject(error)
)

export default api;
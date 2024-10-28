import api from "../../axios/token/AxiosToken";

export const apiGetInfo = async () => {
    try {
        const response = await api.get('/auth/info');
        return response?.data;
    } catch (error) {
        return error?.response?.data
    }
};
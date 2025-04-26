import axios from 'axios';

const httpRequest = axios.create({
    // baseURL: import.meta.env.REACT_APP_BASE_URL,
    baseURL: "/api/admin",
    timeout: 5000, // Hủy request sau 5 giây
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export default httpRequest;

import axios from 'axios';

const httpRequestFormData = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000, // Hủy request sau 10 giây
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const post = async (path, formData, options = {}) => {
    const response = await httpRequestFormData.post(path, formData, options);
    return response.data;
};

export default httpRequestFormData;

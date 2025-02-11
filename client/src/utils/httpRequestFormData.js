import axios from 'axios';

const httpRequestFormData = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000, // Hủy request sau 5 giây
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

import axios from 'axios';

const httpRequestFormData = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 120000, // Hủy request sau 120 giây
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

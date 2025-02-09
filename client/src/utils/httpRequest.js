import axios from 'axios';

const getCsrfToken = () => {
    return document.cookie.match(/(^|;) ?yii_csrf_token=([^;]*)(;|$)/)?.[2];
};

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
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

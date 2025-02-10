import * as request from '~/utils/httpRequest';

export const login = async ({ email, password }) => {
    try {
        const res = await request.post('auth/login', { email, password });
        return res.result;
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        throw error;
    }
};

export const register = async ({ email, password }) => {
    try {
        const res = await request.post('auth/register', { email, password });
        return res.result;
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        throw error;
    }
};

export const getMe = async () => {
    try {
        const response = await request.get('auth/me');
        return response.result;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await request.post('auth/logout', {});
        return response.result;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
};

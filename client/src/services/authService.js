import * as request from '~/utils/httpRequest';

export const login = async ({ email, password }) => {
    try {
        const res = await request.post('auth/login', { email, password });
        return res;
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        throw error;
    }
};

export const register = async ({ email, password }) => {
    try {
        const res = await request.post('auth/register', { email, password });
        return res;
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        throw error;
    }
};

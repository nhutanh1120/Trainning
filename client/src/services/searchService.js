import * as request from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await request.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

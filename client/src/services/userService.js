import * as request from '~/utils/httpRequest';

export const getSuggested = async ({ page = 1, pageSize = 5, type = 'new' }) => {
    try {
        const res = await request.get('users/suggested', {
            params: {
                page,
                page_size: pageSize,
                type, // foryou, popular, new
            },
        });
        return res.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

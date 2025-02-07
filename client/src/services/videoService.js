import * as request from '~/utils/httpRequest';

export const getVideos = async ({ page = 1, type = "for-you" }) => {
    try {
        const res = await request.get('videos', {
            params: {
                page,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

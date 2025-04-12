import * as request from '~/utils/httpRequest';

export const likes = async (uuid) => {
    try {
        const res = await request.post('videos/likes', {
            uuid,
        });
        return res.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const createVideo = async (path, description) => {
    try {
        const res = await request.post('videos/create', {
            path,
            description,
        });
        return res.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getVideos = async ({ page = 1, pageSize = 5, type = 'for-you' }) => {
    try {
        const res = await request.get('videos', {
            params: {
                page,
                page_size: pageSize,
                type,
            },
        });
        return res.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getVideoByUuid = async (uuid) => {
    try {
        const res = await request.get(`videos/view/${uuid}`);
        return res.result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

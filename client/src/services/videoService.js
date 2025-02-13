import * as request from '~/utils/httpRequest';
import * as requestFormData from '~/utils/httpRequestFormData';

export const getVideos = async ({ page = 1, type = 'for-you' }) => {
    try {
        const res = await request.get('videos', {
            params: {
                page,
                type,
            },
        });
        return res.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const uploadVideo = async (formData) => {
    try {
        const res = await requestFormData.post('upload/video', formData);
        return res.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

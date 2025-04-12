import * as requestFormData from '~/utils/httpRequestFormData';

export const uploadVideo = async (formData, onProgress) => {
    try {
        const res = await requestFormData.post('upload/video', formData, {
            onUploadProgress: (progressEvent) => {
                onProgress(progressEvent);
            },
        });
        return res.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

import * as request from '~/utils/httpRequest';

export const getComments = async (postId) => {
    try {
        const res = await request.get(`comment/view/${postId}`);
        return res.result;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách comment:', error);
        return [];
    }
};

export const createComment = async (videoUuid, content) => {
    try {
        const res = await request.post('comment/create', { uuid: videoUuid, content });
        return res.result;
    } catch (error) {
        console.error('Lỗi khi tạo comment:', error);
        return null;
    }
};

export const createReplyComment = async (videoUuid, parentUuid, content) => {
    try {
        const res = await request.post('comment/create-reply', {
            video_uuid: videoUuid,
            parent_uuid: parentUuid,
            content,
        });
        return res.result;
    } catch (error) {
        console.error('Lỗi khi tạo comment:', error);
        return null;
    }
};

import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import UploadProgress from './UploadProgress';
import { uploadVideo } from '~/services/uploadService';
import { createVideo } from '~/services/videoService';
import Button from '~/components/Button';
import VideoThumbnailPicker from './VideoThumbnailPicker';
import PreviewPhone from './PreviewPhone';
import styles from './UploadVideo.module.scss';

const cx = classNames.bind(styles);

function UploadVideo({ file, handleCancel }) {
    const { t } = useTranslation();
    const [videoPath, setVideoPath] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('https://files.fullstack.edu.vn/f8-tiktok/users/4854/646231eb7a517.png');
    const [message, setMessage] = useState('');

    const [isUploading, setIsUploading] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const [percent, setPercent] = useState(0);
    const [uploadedSize, setUploadedSize] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

    const [showThumbnailPicker, setShowThumbnailPicker] = useState(false);

    const textareaRef = useRef(null);

    const handleProgress = (startTime) => (progressEvent) => {
        const now = Date.now();
        const elapsedTime = (now - startTime) / 1000;
        const loaded = progressEvent.loaded;
        const total = progressEvent.total;

        const percent = Math.round((loaded * 100) / total);
        const uploadedSize = (loaded / (1024 * 1024)).toFixed(2);

        let remainingTime = null;
        if (elapsedTime > 0 && loaded > 0) {
            const speed = loaded / elapsedTime;
            const remainingBytes = total - loaded;
            remainingTime = Math.round(remainingBytes / speed);
        }
        setPercent(percent);
        setRemainingTime(remainingTime);
        setUploadedSize(uploadedSize);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a video to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        const startTime = Date.now();
        const response = await uploadVideo(formData, handleProgress(startTime));
        if (response.success) {
            setVideoPath(response.path);
            setMessage('Video uploaded successfully!');
        } else {
            setMessage('Failed to upload video.');
        }
        setIsUploading(false);
    };

    const handleCreateVideo = async () => {
        const response = await createVideo(videoPath, description);
        if (response.success) {
            setMessage('Video uploaded successfully!');
        } else {
            setMessage('Failed to upload video.');
        }
    };

    const handleAddHashtag = () => {
        if (charCount < 4000) {
            setDescription((prev) => prev + '#');
            textareaRef.current?.focus();
        }
    };

    const handleAddMention = () => {
        if (charCount < 4000) {
            setDescription((prev) => prev + '@');
            textareaRef.current?.focus();
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 4000) {
            setDescription(value);
            setCharCount(value.length);
        }
    };

    const handleOpenThumbnailPicker = () => {
        setShowThumbnailPicker(true);
    };

    const handleCloseThumbnailPicker = () => {
        setShowThumbnailPicker(false);
    };

    const handleConfirmThumbnail = (thumbnail) => {
        setThumbnail(thumbnail);
    };

    useEffect(() => {
        setCharCount(description.length);
    }, [description]);

    useEffect(() => {
        if (!file) return;
        handleUpload();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    return (
        <div className={cx('wrapper')}>
            <UploadProgress
                file={file}
                progress={percent}
                uploadedSize={uploadedSize}
                remainingTime={remainingTime}
                handleCancel={handleCancel}
            />

            <div className={cx('upload-body')}>
                <div className={cx('upload-form')}>
                    <div className={cx('section')}>
                        <label className={cx('label')}>{t('UPLOAD.UPLOAD_VIDEO.DESCRIPTION')}</label>
                        <textarea
                            ref={textareaRef}
                            className={cx('textarea')}
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <div className={cx('meta')}>
                            <button onClick={handleAddHashtag}>{t('UPLOAD.UPLOAD_VIDEO.HASHTAG')}</button>
                            <button onClick={handleAddMention}>@ Nhắc đến</button>
                            <span>{charCount}/4000</span>
                        </div>
                    </div>

                    <div className={cx('section')}>
                        <label className={cx('label')}>
                            Ảnh bìa <FontAwesomeIcon icon={faCircleInfo} />
                        </label>
                        <div className={cx('thumbnail-wrapper')}>
                            <img src={thumbnail} alt="Thumbnail" className={cx('thumbnail')} />
                            <div className={cx('overlay')} onClick={handleOpenThumbnailPicker}>
                                <button className={cx('edit-button')}>Sửa ảnh bìa</button>
                            </div>
                        </div>
                    </div>

                    <div className={cx('section')}>
                        <Button primary onClick={handleCreateVideo} disabled={isUploading}>
                            Đăng video
                        </Button>
                        <Button primary className={cx('cancel')} onClick={handleCancel}>
                            Hủy bỏ
                        </Button>
                    </div>
                </div>
                <div className={cx('upload-preview')}>
                    <div className={cx('phone-frame')}>
                        <div className={cx('video-container')}>
                            <video src={'previewUrl'} controls className={cx('upload-preview-video')} />

                            {/* Overlay phần thông tin video */}
                            <div className={cx('video-info')}>
                                <div className={cx('info-text')}>
                                    <p className={cx('username')}>@usert0n6tevjoe</p>
                                    <p className={cx('description')}>video1</p>
                                    <p className={cx('music')}>🎵 Âm thanh gốc - usert0n6tevjoe</p>
                                </div>

                                {/* Các nút bên phải */}
                                <div className={cx('actions')}>
                                    <button className={cx('action-button')}>
                                        <i className="fa-solid fa-heart"></i>
                                    </button>
                                    <button className={cx('action-button')}>
                                        <i className="fa-solid fa-comment-dots"></i>
                                    </button>
                                    <button className={cx('action-button')}>
                                        <i className="fa-solid fa-share"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Thanh thời gian */}
                            <div className={cx('progress-bar')}>
                                <div className={cx('progress')} style={{ width: `30%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PreviewPhone
                videoSrc="link/video.mp4"
                username="usert0n6tevjoe"
                description="video1"
                musicTitle="Âm thanh gốc"
                avatarUrl="link/avatar.png"
                progress={50}
            />

            <VideoThumbnailPicker
                file={file}
                visible={showThumbnailPicker}
                onClose={handleCloseThumbnailPicker}
                onConfirm={handleConfirmThumbnail}
            />
        </div>
    );
}

export default UploadVideo;

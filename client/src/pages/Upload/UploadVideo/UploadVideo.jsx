import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import UploadProgress from './UploadProgress';
import { uploadVideo } from '~/services/uploadService';
import { createVideo } from '~/services/videoService';
import Button from '~/components/Button';
import Image from '~/components/Image/Image';
import VideoThumbnailPicker from './VideoThumbnailPicker';
import PreviewPhone from './PreviewPhone';
import styles from './UploadVideo.module.scss';

const NUM_THUMBNAILS = 5;
const cx = classNames.bind(styles);

function UploadVideo({ file, handleCancel }) {
    const { t } = useTranslation();
    const [videoPath, setVideoPath] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const [isUploading, setIsUploading] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const [percent, setPercent] = useState(0);
    const [uploadedSize, setUploadedSize] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

    const [selectedThumbnail, setSelectedThumbnail] = useState('');
    const [thumbnailList, setThumbnailList] = useState([]);
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
        setSelectedThumbnail(thumbnail);
    };

    const generateThumbnails = (file) => {
        const url = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.src = url;
        video.crossOrigin = 'anonymous';

        video.addEventListener('loadedmetadata', () => {
            const duration = video.duration;
            const interval = duration / NUM_THUMBNAILS; // Chia lấy 5 thumbnails

            const captures = [];
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const captureFrame = (time) => {
                video.currentTime = time;
                video.addEventListener('seeked', function handler() {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
                    captures.push(canvas.toDataURL('image/jpeg'));
                    video.removeEventListener('seeked', handler);

                    if (captures.length < NUM_THUMBNAILS) {
                        captureFrame((captures.length + 1) * interval);
                    } else {
                        setThumbnailList(captures);
                        setSelectedThumbnail(captures[0]); // Set default thumbnail to the first one
                        URL.revokeObjectURL(url);
                    }
                });
            };

            captureFrame(interval);
        });
    };

    useEffect(() => {
        setCharCount(description.length);
    }, [description]);

    useEffect(() => {
        if (!file) return;
        handleUpload();
        generateThumbnails(file);
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
                            <Image src={selectedThumbnail} alt="Thumbnail" className={cx('thumbnail')} />
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

                <PreviewPhone file={file} description={description} />
            </div>

            <VideoThumbnailPicker
                selectedThumbnail={selectedThumbnail}
                thumbnailList={thumbnailList}
                visible={showThumbnailPicker}
                onClose={handleCloseThumbnailPicker}
                onConfirm={handleConfirmThumbnail}
            />
        </div>
    );
}

export default UploadVideo;

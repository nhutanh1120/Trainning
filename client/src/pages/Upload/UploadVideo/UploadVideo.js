import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import UploadProgress from './UploadProgress';
import { uploadVideo } from '~/services/uploadService';
import { createVideo } from '~/services/videoService';
import Button from '~/components/Button';
import styles from './UploadVideo.module.scss';

const cx = classNames.bind(styles);

function UploadVideo({ file, handleCancel }) {
    const [videoPath, setVideoPath] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('https://files.fullstack.edu.vn/f8-tiktok/users/4854/646231eb7a517.png');
    const [message, setMessage] = useState('');

    const [isUploading, setIsUploading] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const [percent, setPercent] = useState(0);
    const [uploadedSize, setUploadedSize] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

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
            remainingTime = remainingBytes / speed;
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

    useEffect(() => {
        setCharCount(description.length);
    }, [description]);

    useEffect(() => {
        if (!file) return;
        handleUpload();
    }, [file]);

    return (
        <div className={cx('wrapper')}>
            <UploadProgress file={file} progress={percent} uploadedSize={uploadedSize} remainingTime={remainingTime} />

            <div className={cx('container')}>
                <div className={cx('section')}>
                    <label className={cx('label')}>Mô tả</label>
                    <textarea
                        ref={textareaRef}
                        className={cx('textarea')}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <div className={cx('meta')}>
                        <button onClick={handleAddHashtag}># Hashtag</button>
                        <button onClick={handleAddMention}>@ Nhắc đến</button>
                        <span>{charCount}/4000</span>
                    </div>
                </div>

                <div className={cx('section')}>
                    <label className={styles.label}>
                        Ảnh bìa <FontAwesomeIcon icon={faCircleInfo} />
                    </label>
                    <div className={styles.thumbnailWrapper}>
                        <img src={thumbnail} alt="Thumbnail" className={styles.thumbnail} />
                        <div className={styles.overlay}>
                            <button className={styles.editButton}>Sửa ảnh bìa</button>
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
        </div>
    );
}

export default UploadVideo;

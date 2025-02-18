import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import UploadProgress from './UploadProgress';
import { uploadVideo } from '~/services/videoService';
import Button from '~/components/Button';
import styles from './UploadVideo.module.scss';

const cx = classNames.bind(styles);

function UploadVideo({ file, handleCancel }) {
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('https://files.fullstack.edu.vn/f8-tiktok/users/4854/646231eb7a517.png');
    const [message, setMessage] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a video to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);

        const response = await uploadVideo(formData);
        if (response.success === true) {
            setMessage('Video uploaded successfully!');
        } else {
            setMessage('Failed to upload video.');
        }
    };

    const handleAddHashtag = () => {
        if (charCount < 4000) {
            setDescription((prev) => prev + '#');
        }
    };

    const handleAddMention = () => {
        if (charCount < 4000) {
            setDescription((prev) => prev + '@');
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

    return (
        <div className={cx('wrapper')}>
            <UploadProgress file={file} />

            <div className={cx('container')}>
                <div className={cx('section')}>
                    <label className={cx('label')}>Mô tả</label>
                    <textarea className={cx('textarea')} value={description} onChange={handleDescriptionChange} />
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
                    <Button primary onClick={handleUpload}>
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

import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import UploadProgress from './UploadProgress';
import { uploadVideo } from '~/services/videoService';
import Button from '~/components/Button';
import styles from './UploadVideo.module.scss';

const cx = classNames.bind(styles);

function UploadVideo({ file }) {
    const [description, setDescription] = useState('3584-66608241175ad');
    const [thumbnail, setThumbnail] = useState('https://files.fullstack.edu.vn/f8-tiktok/users/4854/646231eb7a517.png');
    const [message, setMessage] = useState('');

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a video to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file[0]);
        formData.append('description', description);

        try {
            const response = await uploadVideo(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đảm bảo sử dụng đúng Content-Type
                },
            });

            if (response.status === 'success') {
                setMessage('Video uploaded successfully!');
            } else {
                setMessage('Failed to upload video.');
            }
        } catch (error) {
            setMessage('Error uploading video: ' + error.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <UploadProgress file={file} />

            <div className={cx('container')}>
                {/* Mô tả */}
                <div className={cx('section')}>
                    <label className={cx('label')}>Mô tả</label>
                    <textarea
                        className={cx('textarea')}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className={cx('metaInfo')}>
                        <span># Hashtag</span>
                        <span>@ Nhắc đến</span>
                        <span>18/4000</span>
                    </div>
                </div>

                {/* Ảnh bìa */}
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
                    <Button primary disabled>
                        Hủy bỏ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UploadVideo;

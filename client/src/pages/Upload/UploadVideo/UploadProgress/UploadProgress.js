import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './UploadProgress.module.scss';

const cx = classNames.bind(styles);

const UploadProgress = ({ file, progress, uploadedSize, remainingTime }) => {
    const [duration, setDuration] = useState(''); // Thời lượng video

    const totalSize = (file.size / (1024 * 1024)).toFixed(2); // Tổng dung lượng file (MB)
    const fileName = file.name; // Tên file

    useEffect(() => {
        const url = URL.createObjectURL(file);
        const video = document.createElement('video');

        video.preload = 'metadata';
        video.src = url;

        video.onloadedmetadata = function () {
            URL.revokeObjectURL(url);

            const duration = video.duration;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);

            setDuration(`${minutes} phút ${seconds} giây`);
        };
    }, [file]);

    return (
        <div className={cx('uploadContainer')}>
            {/* Tên file */}
            <h2 className={cx('fileName')}>{fileName}</h2>

            {/* Dung lượng & Thời lượng */}
            <p className={cx('fileInfo')}>
                <strong>Dung lượng:</strong> {totalSize} MB • <strong>Thời lượng:</strong> {duration}
            </p>

            {/* Tiến trình tải */}
            <p className={cx('progressText')}>
                Đã tải lên <strong>{uploadedSize} MB</strong> / {totalSize} MB... Còn <strong>{remainingTime}</strong>{' '}
                giây
            </p>

            {/* Thanh tiến trình */}
            <div className={cx('progressBar')}>
                <div className={cx('progressFill')} style={{ width: `${progress}%` }}></div>
            </div>

            {/* Phần trăm & nút Hủy */}
            <div className={cx('progressFooter')}>
                <span>{progress}%</span>
                <button className={cx('cancelButton')}>Hủy</button>
            </div>
        </div>
    );
};

export default UploadProgress;

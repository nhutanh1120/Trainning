import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './UploadProgress.module.scss';

const cx = classNames.bind(styles);

const UploadProgress = ({ file }) => {
    const [progress, setProgress] = useState(0); // Tiến trình tải lên ban đầu (%)
    const [uploadedSize, setUploadedSize] = useState(0); // MB đã tải lên
    const [remainingTime, setRemainingTime] = useState(0); // Thời gian còn lại (giây)
    const [duration, setDuration] = useState(''); // Thời lượng video

    const totalSize = (file.size / (1024 * 1024)).toFixed(2); // Tổng dung lượng file (MB)
    const fileName = file.name; // Tên file
    const uploadSpeed = 0.5; // Tốc độ tải lên (MB/s)

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

    useEffect(() => {
        const totalSizeMB = parseFloat(totalSize);
        const initialRemainingTime = (totalSizeMB / uploadSpeed).toFixed(0); // Thời gian còn lại ban đầu (giây)
        setRemainingTime(initialRemainingTime);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const newProgress = Math.min(prev + (uploadSpeed / totalSizeMB) * 100, 100);
                const newUploadedSize = ((newProgress / 100) * totalSizeMB).toFixed(2);
                const newRemainingTime = Math.max(((totalSizeMB - newUploadedSize) / uploadSpeed).toFixed(0), 0);
                setUploadedSize(newUploadedSize);
                setRemainingTime(newRemainingTime);
                return newProgress;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [totalSize, uploadSpeed]);

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
                <span>{progress.toFixed(2)}%</span>
                <button className={cx('cancelButton')}>Hủy</button>
            </div>
        </div>
    );
};

export default UploadProgress;

import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './UploadProgress.module.scss'; // Import SCSS module

const cx = classNames.bind(styles);

const UploadProgress = ({ file }) => {
    const [progress, setProgress] = useState(38.39); // Tiến trình tải lên ban đầu (%)
    const [uploadedSize, setUploadedSize] = useState(5.31); // MB đã tải lên
    const totalSize = 13.84; // Tổng dung lượng file (MB)
    const duration = '2 phút 48 giây'; // Thời lượng file
    const [remainingTime, setRemainingTime] = useState(12); // Thời gian còn lại (giây)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const newUploadedSize = ((prev + 5) / 100) * totalSize;
                setUploadedSize(newUploadedSize.toFixed(2));
                setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
                return prev + 5;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cx('uploadContainer')}>
            {/* Tên file */}
            <h2 className={cx('fileName')}>3584-66608241175ad.mp4</h2>

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

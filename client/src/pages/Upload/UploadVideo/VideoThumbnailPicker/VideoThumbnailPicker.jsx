import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import Modal from '~/components/Modal/Modal';
import styles from './VideoThumbnailPicker.module.scss';

const cx = classNames.bind(styles);

const VideoThumbnailPicker = ({ file, visible, onClose, onConfirm }) => {
    const [thumbnails, setThumbnails] = useState([]);
    const [selectedThumbnail, setSelectedThumbnail] = useState('');

    useEffect(() => {
        if (file) {
            generateThumbnails(file);
        }
    }, [file]);

    useEffect(() => {
        if (thumbnails.length > 0) {
            setSelectedThumbnail(thumbnails[0]);
        }
    }, [thumbnails]);

    const generateThumbnails = (file) => {
        const url = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.src = url;
        video.crossOrigin = 'anonymous';

        video.addEventListener('loadedmetadata', () => {
            const duration = video.duration;
            const interval = duration / 5; // Chia lấy 5 thumbnails

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

                    if (captures.length < 5) {
                        captureFrame((captures.length + 1) * interval);
                    } else {
                        setThumbnails(captures);
                        URL.revokeObjectURL(url);
                    }
                });
            };

            captureFrame(interval);
        });
    };

    const handleSelectThumbnail = (thumbnail) => {
        setSelectedThumbnail(thumbnail);
    };

    const handleOk = () => {
        onConfirm(selectedThumbnail);
        onClose();
    };

    return (
        <Modal
            open={visible}
            onOk={handleOk}
            onClose={onClose}
            title="Chọn ảnh đại diện"
            width={800}
            maskClosable={false}
        >
            <div className={cx('wrapper')}>
                <div className={cx('preview')}>
                    <img src={selectedThumbnail} alt="Selected thumbnail" />
                </div>

                <div className={cx('thumbnail-list')}>
                    {thumbnails.map((thumb, index) => (
                        <img
                            key={index}
                            src={thumb}
                            alt={`Thumbnail ${index}`}
                            className={cx('thumbnail-item', { selected: selectedThumbnail === thumb })}
                            onClick={() => handleSelectThumbnail(thumb)}
                        />
                    ))}
                </div>

                <button className={cx('confirm-button')} onClick={handleOk}>
                    Xác nhận
                </button>
            </div>
        </Modal>
    );
};

export default VideoThumbnailPicker;

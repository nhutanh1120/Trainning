import classNames from 'classnames/bind';

import Modal from '~/components/Modal';
import styles from './VideoThumbnailPicker.module.scss';

const cx = classNames.bind(styles);

const VideoThumbnailPicker = ({ selectedThumbnail, thumbnailList, visible, onClose, onConfirm }) => {
    const handleOk = () => {
        onConfirm(selectedThumbnail);
        onClose();
    };

    return (
        <Modal
            open={visible}
            onClose={onClose}
            title="Chọn ảnh bìa"
            width={800}
            maskClosable={false}
            footer={
                <button className={cx('confirm-button')} onClick={handleOk}>
                    Xác nhận
                </button>
            }
        >
            <div className={cx('wrapper')}>
                <div className={cx('preview')}>
                    <img src={selectedThumbnail} alt="Selected thumbnail" />
                </div>

                <div className={cx('thumbnail-list')}>
                    {thumbnailList.map((thumb, index) => (
                        <img
                            key={index}
                            src={thumb}
                            alt={`Thumbnail ${index}`}
                            className={cx('thumbnail-item', { selected: selectedThumbnail === thumb })}
                            onClick={() => onConfirm(thumb)}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default VideoThumbnailPicker;

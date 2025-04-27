import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({
    open,
    title,
    children,
    onClose,
    onOk,
    okText = 'OK',
    cancelText = 'Cancel',
    width = 600,
    loading = false,
    maskClosable = true,
}) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [open, onClose]);

    if (!open) return null;

    const handleBackdropClick = (e) => {
        if (maskClosable && e.target.classList.contains(cx('modal-backdrop'))) {
            onClose();
        }
    };

    return (
        <div className={cx('modal-backdrop')} onClick={handleBackdropClick}>
            <div className={cx('modal-content')} style={{ width }}>
                <div className={cx('modal-header')}>
                    <span>{title}</span>
                    <button className={cx('close-button')} onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className={cx('modal-body')}>{children}</div>

                <div className={cx('modal-footer')}>
                    <button className={cx('cancel-button')} onClick={onClose}>
                        {cancelText}
                    </button>
                    <button className={cx('ok-button')} disabled={loading} onClick={onOk}>
                        {loading ? 'Đang tải...' : okText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

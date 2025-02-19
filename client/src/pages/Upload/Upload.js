import { useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

import { UploadIcon } from '~/components/Icons';
import Button from '~/components/Button';
import UploadVideo from './UploadVideo';
import style from './Upload.module.scss';

const cx = classNames.bind(style);

function Upload() {
    const { t } = useTranslation();
    const [acceptedFiles, setAcceptedFiles] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        console.log('Video đã chọn:', acceptedFiles);
        setAcceptedFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'video/mp4,video/mkv,video/avi,video/mov',
        maxSize: 1 * 1024 * 1024 * 1024, // 1GB
    });

    const handleCancel = () => {
        setAcceptedFiles(null);
    };

    if (acceptedFiles) {
        return <UploadVideo file={acceptedFiles[0]} handleCancel={handleCancel} />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload-container')}>
                <div {...getRootProps()} className={cx('upload-box')}>
                    <input {...getInputProps()} />
                    <UploadIcon width="8rem" height="8rem" className={cx('upload-icon')} />
                    <h2>{t('UPLOAD.SELECT_VIDEO')}</h2>
                    <span>{t('UPLOAD.OR_DRAG_DROP')}</span>
                    <Button primary className={cx('upload-button')}>
                        {t('UPLOAD.CHOOSE_VIDEO')}
                    </Button>
                </div>

                <div className={cx('upload-info')}>
                    <div className={cx('info-item')}>
                        <FontAwesomeIcon icon={faVideo} className={cx('info-icon')} />
                        <div>
                            <strong>{t('UPLOAD.SIZE_DURATION.TITLE')}</strong>
                            <p>{t('UPLOAD.SIZE_DURATION.DESCRIPTION')}</p>
                        </div>
                    </div>

                    <div className={cx('info-item')}>
                        <FontAwesomeIcon icon={faVideo} className={cx('info-icon')} />
                        <div>
                            <strong>{t('UPLOAD.FILE_FORMAT.TITLE')}</strong>
                            <p>{t('UPLOAD.FILE_FORMAT.DESCRIPTION')}</p>
                        </div>
                    </div>

                    <div className={cx('info-item')}>
                        <FontAwesomeIcon icon={faVideo} className={cx('info-icon')} />
                        <div>
                            <strong>{t('UPLOAD.VIDEO_RESOLUTION.TITLE')}</strong>
                            <p>{t('UPLOAD.VIDEO_RESOLUTION.DESCRIPTION')}</p>
                        </div>
                    </div>

                    <div className={cx('info-item')}>
                        <FontAwesomeIcon icon={faVideo} className={cx('info-icon')} />
                        <div>
                            <strong>{t('UPLOAD.ASPECT_RATIO.TITLE')}</strong>
                            <p>{t('UPLOAD.ASPECT_RATIO.DESCRIPTION')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;

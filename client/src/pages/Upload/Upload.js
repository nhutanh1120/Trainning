import { useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from '~/components/Icons';
import style from './Upload.module.scss';
import Button from '~/components/Button';
import UploadVideo from './UploadVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Upload() {
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

    if (acceptedFiles) {
        return <UploadVideo file={acceptedFiles} />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload-container')}>
                <div {...getRootProps()} className={cx('upload-box')}>
                    <input {...getInputProps()} />
                    <UploadIcon width="8rem" height="8rem" className={cx('upload-icon')} />
                    <h2>Chọn video để tải lên</h2>
                    <span>Hoặc kéo và thả vào đây</span>
                    <Button primary className={cx('upload-button')}>
                        Chọn video
                    </Button>
                </div>

                <div className={cx('upload-info')}>
                    <div className={cx('info-item')}>
                        <FontAwesomeIcon icon={faVideo} className={cx('info-icon')} />
                        <div>
                            <strong>Dung lượng và thời lượng</strong>
                            <p>Dung lượng tối đa: 1 GB, thời lượng video: 60 phút.</p>
                        </div>
                    </div>

                    <div className={cx('info-item')}>
                        <FontAwesomeIcon icon={faVideo} className={cx('info-icon')} />
                        <div>
                            <strong>Định dạng tập tin</strong>
                            <p>Đề xuất: ".mp4". Có hỗ trợ các định dạng chính khác.</p>
                        </div>
                    </div>

                    <div className={cx('info-item')}>
                        <FontAwesomeIcon icon={faVideo} className={cx('info-icon')} />
                        <div>
                            <strong>Độ phân giải video</strong>
                            <p>Độ phân giải tối thiểu: 720p. Có hỗ trợ 2K và 4K.</p>
                        </div>
                    </div>

                    <div className={cx('info-item')}>
                        <FontAwesomeIcon icon={faVideo} className={cx('info-icon')} />
                        <div>
                            <strong>Tỷ lệ khung hình</strong>
                            <p>Đề xuất: 16:9 cho chế độ ngang, 9:16 cho chế độ dọc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;

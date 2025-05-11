import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './VideoCard.module.scss';

const cx = classNames.bind(styles);

const VideoCard = ({ url, thumb }) => {
    const videoRef = useRef(null);

    const [playing, setPlaying] = useState(true);
    const [showMediaPlaceholder, setShowMediaPlaceholder] = useState(false);

    const togglePlay = () => {
        if (playing) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setPlaying((prev) => !prev);

        // Display .media-placeholder for 2 seconds
        setShowMediaPlaceholder(true);
        setTimeout(() => {
            setShowMediaPlaceholder(false);
        }, 500);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('media')} onClick={togglePlay}>
                <video className={cx('video')} ref={videoRef} loop autoPlay playsInline muted={true} controls>
                    <source src={url} type="video/mp4" />
                </video>
                {showMediaPlaceholder && (
                    <div className={cx('media-placeholder')}>
                        <div className={cx('animation-icon')}>
                            <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                        </div>
                    </div>
                )}
            </div>
            <div className={cx('background')}>
                <Image src={thumb} alt="video background" />
            </div>
            <div className={cx('controls')}>
                <Button to={config.routes.home} className={cx('close')}>
                    <FontAwesomeIcon icon={faXmark} />
                </Button>
            </div>
        </div>
    );
};

export default VideoCard;

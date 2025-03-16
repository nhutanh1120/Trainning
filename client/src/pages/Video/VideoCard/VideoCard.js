import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import Button from '~/components/Button';
import images from '~/assets/images';
import styles from './VideoCard.module.scss';

const cx = classNames.bind(styles);

const VideoCard = ({ url }) => {
    return (
        <div className={cx('wrapper')}>
            <video className={cx('video')} loop autoPlay playsInline muted={true} controls>
                <source src={url} type="video/mp4" />
            </video>
            <div className={cx('background')}>
                <img src={images.noImage} alt="video background" />
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

import React from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/images';
import styles from './VideoCard.module.scss';

const cx = classNames.bind(styles);

const VideoCard = ({ url }) => {
    return (
        <div className={cx('videoCard')}>
            <video className={cx('video')} loop autoPlay playsInline muted={true} controls>
                <source src={url} type="video/mp4" />
            </video>
            <div className={cx('video-background')}>
                <img src={images.noImage} alt="video background" />
            </div>
        </div>
    );
};

export default VideoCard;

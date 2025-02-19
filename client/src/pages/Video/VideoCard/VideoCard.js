import React from 'react';
import classNames from 'classnames/bind';
import styles from './VideoCard.module.scss';

const cx = classNames.bind(styles);

const VideoCard = ({ url }) => {
    return (
        <div className={cx('videoCard')}>
            <video className={cx('video')} url={url} playing loop controls width="100%" height="100%" />
        </div>
    );
};

export default VideoCard;

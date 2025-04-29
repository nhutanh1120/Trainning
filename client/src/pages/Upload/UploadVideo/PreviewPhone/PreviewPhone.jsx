import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignal,
    faWifi,
    faBatteryFull,
    faHeart,
    faCommentDots,
    faShare,
    faMusic,
    faHome,
    faUserFriends,
    faSquarePlus,
    faInbox,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './PreviewPhone.module.scss';

const cx = classNames.bind(styles);

const PreviewPhone = ({ videoSrc, username, description, musicTitle, avatarUrl, progress }) => {
    return (
        <div className={cx('upload-preview')}>
            <div className={cx('phone-background')}></div>
            <div className={cx('phone-frame')}>
                <div className={cx('phone-header')}>
                    <span>8:00</span>
                    <div className={cx('icons')}>
                        <FontAwesomeIcon icon={faSignal} />
                        <FontAwesomeIcon icon={faWifi} />
                        <FontAwesomeIcon icon={faBatteryFull} />
                    </div>
                </div>

                <div className={cx('video-container')}>
                    <video className={cx('video')} src={videoSrc} autoPlay loop muted />

                    <div className={cx('overlay')}>
                        <div className={cx('video-info')}>
                            <div className={cx('username')}>@{username}</div>
                            <div className={cx('description')}>{description}</div>
                            <div className={cx('music')}>
                                <FontAwesomeIcon icon={faMusic} /> {musicTitle}
                            </div>
                        </div>

                        <div className={cx('actions')}>
                            <img src={avatarUrl} alt="avatar" className={cx('avatar')} />
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faCommentDots} />
                            </div>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faShare} />
                            </div>
                        </div>
                    </div>

                    <div className={cx('progress-bar')}>
                        <div className={cx('progress')} style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <div className={cx('phone-footer')}>
                    <div className={cx('footer-icon')}>
                        <FontAwesomeIcon icon={faHome} />
                    </div>
                    <div className={cx('footer-icon')}>
                        <FontAwesomeIcon icon={faUserFriends} />
                    </div>
                    <div className={cx('footer-icon')}>
                        <FontAwesomeIcon icon={faSquarePlus} className={cx('plus-icon')} />
                    </div>
                    <div className={cx('footer-icon')}>
                        <FontAwesomeIcon icon={faInbox} />
                    </div>
                    <div className={cx('footer-icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPhone;

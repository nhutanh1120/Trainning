import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
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
    faPause,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';

import { LiveIcon, SearchIcon } from '~/components/Icons';
import Image from '~/components/Image';
import styles from './PreviewPhone.module.scss';

const cx = classNames.bind(styles);

const PreviewPhone = ({ file, description }) => {
    const user = useSelector((state) => state.auth.user);

    const [time, setTime] = useState(dayjs().format('HH:mm'));
    const [videoSrc, setVideoSrc] = useState('');

    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);

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

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video && video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(percent);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format('HH:mm'));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoSrc(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [file]);

    return (
        <div className={cx('upload-preview')}>
            <div className={cx('phone-background')}></div>
            <div className={cx('phone-frame')}>
                <div className={cx('phone-header')}>
                    <span>{time}</span>
                    <div className={cx('icons')}>
                        <FontAwesomeIcon icon={faSignal} />
                        <FontAwesomeIcon icon={faWifi} />
                        <FontAwesomeIcon icon={faBatteryFull} />
                    </div>
                </div>

                <div className={cx('video-container')}>
                    <div className={cx('video-header')}>
                        <div className={cx('icon-live')}>
                            <LiveIcon />
                        </div>

                        <div className={cx('friends')}>Bạn bè</div>
                        <div className={cx('friends')}>Đang Follow</div>
                        <div className={cx('foryou', 'active')}>Dành cho bạn</div>
                        <div className={cx('icon-search')}>
                            <SearchIcon />
                        </div>
                    </div>
                    <video
                        ref={videoRef}
                        className={cx('video')}
                        {...(videoSrc ? { src: videoSrc } : {})}
                        onTimeUpdate={handleTimeUpdate}
                        autoPlay
                        loop
                        muted
                    />

                    <div className={cx('overlay')} onClick={togglePlay}>
                        <div className={cx('video-info')}>
                            <div className={cx('username')}>@{user.full_name}</div>
                            <div className={cx('description')}>{description}</div>
                            <div className={cx('music')}>
                                <FontAwesomeIcon icon={faMusic} /> {`Âm thanh gốc - ${user.full_name}`}
                            </div>
                        </div>

                        <div className={cx('actions')}>
                            <Image src={user.avatar} alt="avatar" className={cx('avatar')} />
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faCommentDots} />
                            </div>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faShare} />
                            </div>
                            <div className={cx('music', { active: playing })}>
                                <Image src={user.avatar} alt="avatar" />
                            </div>
                        </div>
                    </div>

                    <div className={cx('progress-bar')}>
                        <div className={cx('progress')} style={{ width: `${progress}%` }}></div>
                    </div>

                    {showMediaPlaceholder && (
                        <div className={cx('media-placeholder')}>
                            <div className={cx('animation-icon')}>
                                <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                            </div>
                        </div>
                    )}
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

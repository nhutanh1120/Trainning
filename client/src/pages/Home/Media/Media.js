import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { VolumeMuteIcon, VolumeUpIcon, PictureToPictureIcon } from '~/components/Icons';
import styles from './Media.module.scss';

const cx = classNames.bind(styles);

function Media({
    index,
    currentIndex,
    playing,
    muted,
    handleTogglePlay,
    handleToggleMute,
    handleSetCurrentIndex,
    video,
}) {
    const videoRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showMediaPlaceholder, setShowMediaPlaceholder] = useState(false);

    const toggleMute = () => {
        videoRef.current.muted = !muted;
        handleToggleMute();
    };

    const togglePlay = () => {
        if (playing) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        handleTogglePlay();

        // Display .media-placeholder for 2 seconds
        setShowMediaPlaceholder(true);
        setTimeout(() => {
            setShowMediaPlaceholder(false);
        }, 500);
    };

    const togglePiP = async () => {
        if (!document.pictureInPictureElement) {
            await videoRef.current.requestPictureInPicture();
        } else {
            document.exitPictureInPicture();
        }
    };

    const renderDescription = (text) => {
        const parts = text.split(/(#\w+|@\w+)/g);
        return parts.map((part, index) => {
            if (part.startsWith('#')) {
                return (
                    <Link key={index} to={`/tag/${part.substring(1)}`} className={cx('tag')}>
                        {part}
                    </Link>
                );
            } else if (part.startsWith('@')) {
                return (
                    <Link key={index} to={`/user/${part.substring(1)}`} className={cx('mention')}>
                        {part}
                    </Link>
                );
            } else {
                return part;
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    handleSetCurrentIndex(index); // Cập nhật video hiện tại
                }
            },
            { threshold: 0.7 }, // Chỉ kích hoạt khi 70% video vào màn hình
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [index, handleSetCurrentIndex]);

    useEffect(() => {
        if (videoRef.current && currentIndex === index) {
            if (videoRef.current.readyState >= 3) {
                if (playing) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            }
            videoRef.current.muted = muted;
        } else {
            if (videoRef.current.readyState >= 3) {
                videoRef.current.pause();
            }
            videoRef.current.muted = true;
        }
    }, [index, currentIndex, playing, muted]);

    return (
        <section className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('player-wrapper')} onClick={togglePlay}>
                    <video
                        loop
                        autoPlay
                        playsInline
                        muted={muted}
                        //  controls
                        ref={videoRef}
                    >
                        <source src={video.file_path} type="video/mp4" />
                    </video>
                </div>
                <div className={cx('media-controls-top')}>
                    <button onClick={toggleMute}>
                        {muted ? (
                            <VolumeMuteIcon width="2.4rem" height="2.4rem" />
                        ) : (
                            <VolumeUpIcon width="2.4rem" height="2.4rem" />
                        )}
                    </button>
                </div>
                <div className={cx('media-controls-bottom')}>
                    <div className={cx('description')}>
                        <div className={cx('info')}>
                            <Link to={`/user/${video.user.uuid}`} className={cx('author')}>
                                <h3 className={cx('name')}>{video.user.full_name}</h3>
                                <span className={cx('dot')}>·</span>
                                <span className={cx('date')}>{moment.unix(video.updated_at).fromNow()}</span>
                            </Link>
                            <div
                                className={cx('content', {
                                    active: isExpanded,
                                })}
                            >
                                <p>{renderDescription(video.description)}</p>
                            </div>
                        </div>
                        <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Ẩn bớt' : 'Thêm'}</button>
                    </div>
                    <button onClick={togglePiP}>
                        <PictureToPictureIcon width="2.4rem" height="2.4rem" />
                    </button>
                </div>
            </div>
            {showMediaPlaceholder && (
                <div className={cx('media-placeholder')}>
                    <div className={cx('animation-icon')}>
                        <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                    </div>
                </div>
            )}
        </section>
    );
}

export default Media;

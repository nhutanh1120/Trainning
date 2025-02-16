import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { VolumeMuteIcon, VolumeUpIcon, PictureToPictureIcon } from '~/components/Icons';
import styles from './Media.module.scss';

const cx = classNames.bind(styles);

function Media({ video }) {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showMediaPlaceholder, setShowMediaPlaceholder] = useState(false);

    const toggleMute = () => {
        videoRef.current.muted = !muted;
        setMuted(!muted);
    };

    const togglePlay = () => {
        if (playing) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setPlaying(!playing);

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
                        <source src={`http://localhost:8080${video.file_path}`} type="video/mp4" />
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
                            <Link to="/about" className={cx('author')}>
                                <h3 className={cx('name')}>author</h3>
                                <span className={cx('dot')}>·</span>
                                <span className={cx('date')}>4 ngay truoc</span>
                            </Link>
                            <div
                                className={cx('content', {
                                    active: isExpanded,
                                })}
                            >
                                <p className={cx('text')}>{video.description}</p>
                                <div className={cx('tag')}>
                                    <Link to="/tag/a">#a</Link>
                                    <Link to="/tag/b">#b</Link>
                                    <Link to="/tag/c">#c</Link>
                                </div>
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

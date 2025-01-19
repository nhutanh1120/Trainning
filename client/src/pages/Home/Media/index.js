import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Media.module.scss';
import { VolumeMuteIcon, VolumeUpIcon, PictureToPictureIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Media() {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [pip, setPip] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

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
    };

    const togglePiP = async () => {
        if (!document.pictureInPictureElement) {
            await videoRef.current.requestPictureInPicture();
            setPip(true);
        } else {
            document.exitPictureInPicture();
            setPip(false);
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
                        <source
                            src="https://files.fullstack.edu.vn/f8-tiktok/videos/3624-6669c160c13f5.mp4"
                            type="video/mp4"
                        />
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
                            <a className={cx('author')}>
                                <h3 className={cx('name')}>author</h3>
                                <span className={cx('dot')}>·</span>
                                <span className={cx('date')}>4 ngay truoc</span>
                            </a>
                            <div
                                className={cx('content', {
                                    active: isExpanded,
                                })}
                            >
                                <p className={cx('text')}>mo ta video</p>
                                <div className={cx('tag')}>
                                    <a>#a</a>
                                    <a>#b</a>
                                    <a>#c</a>
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
        </section>
    );
}

export default Media;

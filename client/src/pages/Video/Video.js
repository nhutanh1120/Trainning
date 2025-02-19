import classNames from 'classnames/bind';
import VideoCard from './VideoCard';
import styles from './Video.module.scss';
import VideoDescription from './VideoDescription';

const cx = classNames.bind(styles);

function Video() {
    return (
        <div className={cx('wrapper')}>
            <VideoCard url="https://www.w3schools.com/html/mov_bbb.mp4" />
            <VideoDescription />
        </div>
    );
}

export default Video;

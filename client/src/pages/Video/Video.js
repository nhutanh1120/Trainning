import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import LoadingOverlay from '~/components/LoadingOverlay';
import { getVideoByUuid } from '~/services/videoService';
import VideoCard from './VideoCard';
import VideoDescription from './VideoDescription';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video() {
    const { uuid } = useParams();
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const data = await getVideoByUuid(uuid);
            setVideoData(data);
        };

        fetchVideo();
    }, [uuid]);

    if (!videoData) {
        return <LoadingOverlay loading fullScreen />;
    }

    return (
        <div className={cx('wrapper')}>
            <VideoCard url={videoData.data.file_path} />
            <VideoDescription videoData={videoData.data} />
        </div>
    );
}

export default Video;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import LoadingOverlay from '~/components/LoadingOverlay';
import { getVideoByUuid } from '~/services/videoService';
import VideoCard from './VideoCard';
import VideoDescription from './VideoDescription';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video() {
    const { uuid } = useParams();
    const { t } = useTranslation();
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const res = await getVideoByUuid(uuid);
            setVideoData(res);
        };

        fetchVideo();
    }, [uuid]);

    if (!videoData) {
        return <LoadingOverlay loading fullScreen />;
    }

    if (!videoData.success) {
        return <div>{t('COMMON.EMPTY_TEXT')}</div>;
    }

    return (
        <div className={cx('wrapper')}>
            <VideoCard url={videoData.items.file_path} />
            <VideoDescription videoData={videoData.items} />
        </div>
    );
}

export default Video;

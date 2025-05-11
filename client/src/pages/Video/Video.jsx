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
    const [isLoading, setIsLoading] = useState(false);
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            setIsLoading(true);
            const res = await getVideoByUuid(uuid);
            setIsLoading(false);
            setVideoData(res.items || '');
        };

        fetchVideo();
    }, [uuid]);

    if (!videoData) {
        return <div>{t('COMMON.EMPTY_TEXT')}</div>;
    }

    return (
        <LoadingOverlay loading={isLoading} fullScreen>
            <div className={cx('wrapper')}>
                <VideoCard url={videoData.file_path} thumb={videoData.thumb_path} />
                <VideoDescription videoData={videoData} />
            </div>
        </LoadingOverlay>
    );
}

export default Video;

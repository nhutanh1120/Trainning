import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import Media from './Media';
import ActionBar from './ActionBar';
import * as videosServices from '~/services/videoService';
import LoadingOverlay from '~/components/LoadingOverlay';
import { AngleUpIcon, AngleDownIcon, TiktokIcon } from '~/components/Icons';
import style from './Home.module.scss';

const PAGE_SIZE = 10;
const cx = classNames.bind(style);

function Home() {
    const { t } = useTranslation();
    const articlesRef = useRef([]);
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);

    const [loading, setLoading] = useState(false);

    const handleTogglePlay = () => {
        setPlaying((prev) => !prev);
    };

    const handleToggleMute = () => {
        setMuted((prev) => !prev);
    };

    const handleSetCurrentIndex = (index) => {
        setCurrentIndex(index);
    };

    const handleScroll = (direction) => {
        let nextIndex =
            direction === 'down'
                ? Math.min(currentIndex + 1, articlesRef.current.length - 1)
                : Math.max(currentIndex - 1, 0);

        articlesRef.current[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(nextIndex);
    };

    useEffect(() => {
        if (currentIndex > 0 && (currentIndex + 5) % 10 === 0 && videos.length < totalCount) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [currentIndex, videos.length, totalCount]);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const result = await videosServices.getVideos({ page, pageSize: PAGE_SIZE, type: 'for-you' });
            setLoading(false);
            if (result.items) {
                setVideos((prevVideos) => [...prevVideos, ...result.items]);
                setTotalCount(result.pagination.totalCount);
            }
        };

        fetchApi();
    }, [page]);

    return (
        <LoadingOverlay loading={loading} fullScreen={false}>
            <div className={cx('wrapper')}>
                <div className={cx('list-content')}>
                    {videos.map((video, index) => (
                        <article key={index} className={cx('content')} ref={(el) => (articlesRef.current[index] = el)}>
                            <Media
                                index={index}
                                currentIndex={currentIndex}
                                playing={playing}
                                muted={muted}
                                handleSetCurrentIndex={handleSetCurrentIndex}
                                handleTogglePlay={handleTogglePlay}
                                handleToggleMute={handleToggleMute}
                                video={video}
                            />
                            <ActionBar data={video} />
                        </article>
                    ))}
                </div>
                <div className={cx('navigation')}>
                    <button disabled={loading || currentIndex === 0} onClick={() => handleScroll('up')}>
                        <AngleUpIcon width="2.4rem" height="2.4rem" />
                    </button>
                    <button
                        disabled={loading || currentIndex === videos.length - 1}
                        onClick={() => handleScroll('down')}
                    >
                        <AngleDownIcon width="2.4rem" height="2.4rem" />
                    </button>
                </div>
                <div className={cx('promotion')}>
                    <button className={cx('coin')}>
                        <TiktokIcon width="1.4rem" height="1.4rem" />
                        {t('HOME.GET_COINS')}
                    </button>
                </div>
            </div>
        </LoadingOverlay>
    );
}

export default Home;

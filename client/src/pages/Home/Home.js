import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import Media from './Media';
import ActionBar from './ActionBar';
import * as videosServices from '~/services/videoService';
import { AngleUpIcon, AngleDownIcon, TiktokIcon } from '~/components/Icons';
import style from './Home.module.scss';

const cx = classNames.bind(style);

function Home() {
    const { t } = useTranslation();
    const articlesRef = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videos, setVideos] = useState([]);

    const handleScroll = (direction) => {
        let nextIndex =
            direction === 'down'
                ? Math.min(currentIndex + 1, articlesRef.current.length - 1)
                : Math.max(currentIndex - 1, 0);

        articlesRef.current[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(nextIndex);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const result = await videosServices.getVideos({ page: 1, type: 'for-you' });
            if (result.items) {
                setVideos(result.items);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-content')}>
                {videos.map((video, index) => (
                    <article key={index} className={cx('content')} ref={(el) => (articlesRef.current[index] = el)}>
                        <Media video={video} />
                        <ActionBar />
                    </article>
                ))}
            </div>
            <div className={cx('navigation')}>
                <button onClick={() => handleScroll('up')}>
                    <AngleUpIcon width="2.4rem" height="2.4rem" />
                </button>
                <button onClick={() => handleScroll('down')}>
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
    );
}

export default Home;

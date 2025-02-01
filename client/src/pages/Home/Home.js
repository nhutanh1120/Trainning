import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Home.module.scss';

import Media from './Media';
import ActionBar from './ActionBar';
import { AngleUpIcon, AngleDownIcon, TiktokIcon } from '~/components/Icons';

const cx = classNames.bind(style);

function Home() {
    const articlesRef = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (direction) => {
        let nextIndex =
            direction === 'down'
                ? Math.min(currentIndex + 1, articlesRef.current.length - 1)
                : Math.max(currentIndex - 1, 0);

        articlesRef.current[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(nextIndex);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-content')}>
                {[...Array(5)].map((_, index) => (
                    <article key={index} className={cx('content')} ref={(el) => (articlesRef.current[index] = el)}>
                        <Media />
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
                    nhận xu
                </button>
            </div>
        </div>
    );
}

export default Home;

import { Link } from 'react-router-dom';
import Media from './Media';
import ActionBar from './ActionBar';
import classNames from 'classnames/bind';
import style from './Home.module.scss';
import { useRef, useState } from 'react';

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
                    <article key={index} className="content" ref={(el) => (articlesRef.current[index] = el)}>
                        <Media />
                        <ActionBar />
                    </article>
                ))}
            </div>
            <div className={cx('navigation')}>
                <button onClick={() => handleScroll('up')}>Cuộn Lên</button>
                <button onClick={() => handleScroll('down')}>Cuộn Xuống</button>
            </div>
            <div className={cx('promotion')}></div>
        </div>
    );
}

export default Home;

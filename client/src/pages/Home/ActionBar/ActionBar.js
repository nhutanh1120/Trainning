import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faHeart, faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import ButtonIcon from './ButtonAction';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import styles from './ActionBar.module.scss';

function ActionBar() {
    const [showBookmark, setShowBookmark] = useState(false);
    const [showShare, setShowShare] = useState(false);

    return (
        <section className="wrapper">
            <ButtonIcon type="img" src="https://files.fullstack.edu.vn/f8-tiktok/users/6767/6669bebac4812.jpg" />
            <ButtonIcon type="icon" icon={<FontAwesomeIcon icon={faHeart} />} count="12M" />
            <ButtonIcon type="icon" icon={<FontAwesomeIcon icon={faCommentDots} />} to="/video/" count="12M" />

            <HeadlessTippy
                interactive
                visible={showBookmark}
                placement="right"
                onClickOutside={() => setShowBookmark(false)}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper className={styles['popper-bookmark']}>
                            <Button primary leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Tạo bộ sưu tập mới
                            </Button>
                        </PopperWrapper>
                    </div>
                )}
            >
                <ButtonIcon
                    type="icon"
                    icon={<FontAwesomeIcon icon={faBookmark} />}
                    count="12M"
                    onClick={() => setShowBookmark((prev) => !prev)}
                />
            </HeadlessTippy>

            <HeadlessTippy
                visible={showShare}
                onClickOutside={() => setShowShare(false)}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper>Chia sẻ với</PopperWrapper>
                    </div>
                )}
            >
                <ButtonIcon
                    type="icon"
                    icon={<FontAwesomeIcon icon={faShare} />}
                    count="12M"
                    onClick={() => setShowShare((prev) => !prev)}
                />
            </HeadlessTippy>
        </section>
    );
}

export default ActionBar;

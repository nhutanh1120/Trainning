import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faHeart, faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import ButtonIcon from './ButtonAction';
import { useAuthModal } from '~/contexts/AuthModalContext';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { follows } from '~/services/userService';
import { likes } from '~/services/videoService';
import styles from './ActionBar.module.scss';

function ActionBar({ data }) {
    const user = useSelector((state) => state.auth.user);
    const { openAuthModal } = useAuthModal();
    const [showBookmark, setShowBookmark] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const [isFollowed, setIsFollowed] = useState(data.user.is_followed || false);

    const [isLiked, setIsLiked] = useState(data.is_liked || false);
    const [likesCount, setLikesCount] = useState(data.likes_count || 0);

    const handleFollows = async () => {
        if (data.user.uuid === undefined) {
            return;
        }

        const result = await follows(data.user.uuid);
        if (result.success) {
            setIsFollowed(result.is_followed);
        }
    };

    const handleLikes = async () => {
        if (data.uuid === undefined) {
            return;
        }

        const result = await likes(data.uuid);
        if (result.success) {
            setIsLiked(result.is_liked);
            setLikesCount(result.likes_count);
        }
    };

    return (
        <section className="wrapper">
            <ButtonIcon
                type="img"
                active={user && isFollowed === 1}
                showIcon={!user || (data.user.allows_followers === 1 && data.user.uuid !== user.uuid)}
                onClick={user ? handleFollows : openAuthModal}
                src={data.user.avatar}
            />

            <ButtonIcon
                type="icon"
                active={isLiked === 1}
                onClick={user ? handleLikes : openAuthModal}
                icon={<FontAwesomeIcon icon={faHeart} />}
                count={likesCount}
            />

            <ButtonIcon
                type="icon"
                to={`/video/${data.uuid}`}
                count={data.comments_count || 0}
                icon={<FontAwesomeIcon icon={faCommentDots} />}
            />

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
                    count={data.bookmarks_count || 0}
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
                    count={data.shares_count || 0}
                    onClick={() => setShowShare((prev) => !prev)}
                    icon={<FontAwesomeIcon icon={faShare} />}
                />
            </HeadlessTippy>
        </section>
    );
}

export default ActionBar;

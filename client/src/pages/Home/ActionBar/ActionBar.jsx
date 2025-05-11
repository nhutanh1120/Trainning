import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faHeart, faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import ButtonAction from './ButtonAction';
import { useAuthModal } from '~/contexts/AuthModalContext';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { follows } from '~/services/userService';
import { likes } from '~/services/videoService';
import styles from './ActionBar.module.scss';

function ActionBar({ videoData }) {
    const user = useSelector((state) => state.auth.user);
    const { openAuthModal } = useAuthModal();
    const [showBookmark, setShowBookmark] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const [isFollowed, setIsFollowed] = useState(videoData.user.is_followed || false);

    const [isLiked, setIsLiked] = useState(videoData.is_liked || false);
    const [likesCount, setLikesCount] = useState(videoData.likes_count || 0);

    const handleFollows = async () => {
        if (videoData.user.uuid === undefined) {
            return;
        }

        const result = await follows(videoData.user.uuid);
        if (result.success) {
            setIsFollowed(result.is_followed);
        }
    };

    const handleLikes = async () => {
        if (videoData.uuid === undefined) {
            return;
        }

        const result = await likes(videoData.uuid);
        if (result.success) {
            setIsLiked(result.is_liked);
            setLikesCount(result.likes_count);
        }
    };

    return (
        <section className="wrapper">
            <ButtonAction
                type="img"
                active={user && isFollowed === 1}
                showIcon={!user || (videoData.user.allows_followers === 1 && videoData.user.uuid !== user.uuid)}
                onClick={user ? handleFollows : openAuthModal}
                src={videoData.user.avatar}
            />

            <ButtonAction
                type="icon"
                active={isLiked === 1}
                onClick={user ? handleLikes : openAuthModal}
                icon={<FontAwesomeIcon icon={faHeart} />}
                count={likesCount}
            />

            <ButtonAction
                type="icon"
                to={`/video/${videoData.uuid}`}
                count={videoData.comments_count || 0}
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
                <ButtonAction
                    type="icon"
                    icon={<FontAwesomeIcon icon={faBookmark} />}
                    count={videoData.bookmarks_count || 0}
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
                <ButtonAction
                    type="icon"
                    count={videoData.shares_count || 0}
                    onClick={() => setShowShare((prev) => !prev)}
                    icon={<FontAwesomeIcon icon={faShare} />}
                />
            </HeadlessTippy>
        </section>
    );
}

export default ActionBar;

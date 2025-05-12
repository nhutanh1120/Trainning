import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons';

import Image from '~/components/Image';
import Button from '~/components/Button';
import Comment from './Comment';
import CommentInput from './CommentInput';
import LoadingOverlay from '~/components/LoadingOverlay';
import { useAuthModal } from '~/contexts/AuthModalContext';
import { createComment, createReplyComment, getComments } from '~/services/commentService';
import styles from './VideoDescription.module.scss';

const cx = classNames.bind(styles);

function VideoDescription({ videoData }) {
    const { t } = useTranslation();
    const { openAuthModal } = useAuthModal();

    const user = useSelector((state) => state.auth.user);

    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(videoData.comments_count);
    const [activeTab, setActiveTab] = useState('comments');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!videoData.uuid) return;

        const fetchComments = async () => {
            setLoading(true);
            const fetchedComments = await getComments(videoData.uuid);
            setLoading(false);
            setComments(fetchedComments.items);
        };

        fetchComments();
    }, [videoData.uuid]);

    const handlePostComment = async (newComment) => {
        const newCmt = await createComment(videoData.uuid, newComment);

        if (newCmt) {
            setComments([newCmt.items, ...comments]);
            setCommentCount(commentCount + 1);
        }
    };

    const handlePostReply = (commentUuid) => async (newComment) => {
        const newReply = await createReplyComment(videoData.uuid, commentUuid, newComment);

        if (newReply) {
            const newComments = comments.map((comment) =>
                comment.uuid === commentUuid
                    ? { ...comment, replies: [newReply.items, ...(comment.replies || [])] }
                    : comment,
            );
            setComments(newComments);
            setCommentCount(commentCount + 1);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image src={videoData.user.avatar} alt={videoData.user.full_name} className={cx('avatar')} />
                <div className={cx('info')}>
                    <h3 className={cx('username')}>{videoData.user.nickname}</h3>
                    <span className={cx('nickname')}>
                        {videoData.user.full_name} · {dayjs.unix(videoData.updated_at).fromNow()}
                    </span>
                    <p>{videoData.description}</p>
                </div>
                {user && videoData?.user && user.uuid !== videoData.user.uuid && (
                    <Button className={cx('follow')} onClick={openAuthModal}>
                        {videoData.user.is_followed !== 1
                            ? t('VIDEO.VIDEO_DESCRIPTION.FOLLOW')
                            : t('VIDEO.VIDEO_DESCRIPTION.UNFOLLOW')}
                    </Button>
                )}
            </div>

            <div className={cx('actions')}>
                <div className={cx('action-group')}>
                    <button className={cx('button-action')}>
                        <span className={cx('icon', { active: videoData.is_liked === 1 })}>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                        <strong className={cx('count')}>{videoData.likes_count}</strong>
                    </button>
                    <button className={cx('button-action')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </span>
                        <strong className={cx('count')}>{commentCount}</strong>
                    </button>
                    <button className={cx('button-action')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </span>
                        <strong className={cx('count')}>{videoData.bookmarks_count}</strong>
                    </button>
                </div>
            </div>

            <div className={cx('copy-link')} onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <span className={cx('link-text')}>
                    http://localhost:3000/video/bafdGGVroD_ZsxssUNTCeTu-FAJxHca6FkZZ
                </span>
                <button className={cx('button')}>{t('VIDEO.VIDEO_DESCRIPTION.COPY_LINK')}</button>
            </div>

            <div className={cx('tabs-action')}>
                <div
                    className={cx('tab', 'tab-comments', { active: activeTab === 'comments' })}
                    onClick={() => setActiveTab('comments')}
                >
                    {t('VIDEO.VIDEO_DESCRIPTION.COMMENT')} ({commentCount})
                </div>
                <div
                    className={cx('tab', 'tab-creator-videos', { active: activeTab === 'creatorVideos' })}
                    onClick={() => setActiveTab('creatorVideos')}
                >
                    {t('VIDEO.VIDEO_DESCRIPTION.CREATOR')}
                </div>
            </div>

            <div className={cx('comments-section')}>
                <LoadingOverlay loading={loading} fullScreen={false}>
                    {comments.map((comment) => (
                        <Comment key={comment.uuid} comment={comment} handlePostReply={handlePostReply(comment.uuid)} />
                    ))}
                </LoadingOverlay>
            </div>

            <CommentInput onPost={handlePostComment} className={cx('comment-input')} />
        </div>
    );
}

export default VideoDescription;

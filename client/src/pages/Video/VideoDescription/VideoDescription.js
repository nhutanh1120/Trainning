import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faHeart, faLink } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import Image from '~/components/Image';
import { createComment, getComments } from '~/services/CommentService';
import styles from './VideoDescription.module.scss';

const cx = classNames.bind(styles);
const commentsData = [
    {
        id: 1,
        user: 'Minh Tuấn',
        content: 'Cuối tuần rồi, mọi người có kế hoạch gì chưa?',
        time: '3h ago',
        likes: 5,
        replies: [
            {
                id: 11,
                user: 'Linh Cute 🦋',
                content: 'Đi cafe chém gió thôi anh ơi!',
                time: '2h ago',
                likes: 2,
            },
        ],
    },
    {
        id: 2,
        user: 'Thanh Hương',
        content: 'Tết này có ai đi du lịch không nhỉ?',
        time: '1d ago',
        likes: 8,
        replies: [
            {
                id: 12,
                user: 'Văn Hậu ✈️',
                content: 'Mình định đi Đà Lạt, có ai chung team không?',
                time: '20h ago',
                likes: 3,
            },
        ],
    },
    {
        id: 3,
        user: 'Bảo Long',
        content: 'Hôm nay trời đẹp quá, đúng kiểu thời tiết để ra đường!',
        time: '2d ago',
        likes: 3,
        replies: [],
    },
    {
        id: 4,
        user: 'Hải Nam',
        content: 'Ai có bộ phim nào hay không, cuối tuần muốn cày phim?',
        time: '3d ago',
        likes: 4,
        replies: [
            {
                id: 13,
                user: 'Ngọc Trinh 🌸',
                content: 'Xem "Money Heist" đi, đảm bảo không thất vọng!',
                time: '2d ago',
                likes: 6,
            },
        ],
    },
    {
        id: 5,
        user: 'Hạnh Nguyên',
        content: 'Hôm nay đi làm mà muốn nghỉ quá 😭',
        time: '4d ago',
        likes: 10,
        replies: [
            {
                id: 14,
                user: 'Tuấn Anh',
                content: 'Cố lên! Cuối tháng nhận lương là vui ngay!',
                time: '3d ago',
                likes: 5,
            },
        ],
    },
];

function VideoDescription({ videoData }) {
    const [comments, setComments] = useState(commentsData);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [replyVisible, setReplyVisible] = useState({});
    const [activeTab, setActiveTab] = useState('comments');

    useEffect(() => {
        if (!videoData.uuid) return;

        const fetchComments = async () => {
            const fetchedComments = await getComments(videoData.uuid);
            // setComments(fetchedComments);
        };

        fetchComments();
    }, [videoData.uuid]);

    const toggleReply = (commentId) => {
        setReplyVisible((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const handlePostComment = async () => {
        if (!newComment.trim()) return;
        setLoading(true);
        setError(null); // Xóa lỗi cũ nếu có

        const newCmt = await createComment(videoData.uuid, newComment);

        if (newCmt) {
            console.log(newCmt.items);
            setComments([newCmt.items, ...comments]);
            setNewComment('');
        } else {
            setError('Không thể gửi bình luận. Vui lòng thử lại!');
        }

        setLoading(false);
    };

    return (
        <div className={cx('video-post')}>
            <div className={cx('post-header')}>
                <Image src={videoData.user.avatar} alt={videoData.user.full_name} className={cx('avatar')} />
                <div className={cx('post-info')}>
                    <h3 className={cx('username')}>{videoData.user.nickname}</h3>
                    <span className={cx('nickname')}>
                        {videoData.user.full_name} · {moment.unix(videoData.updated_at).fromNow()}
                    </span>
                    <p>{videoData.description}</p>
                </div>
                <button className={cx('follow-btn')}>Follow</button>
            </div>

            <div className={cx('post-actions')}>
                <div>
                    <FontAwesomeIcon icon={faHeart} /> {videoData.likes_count}
                </div>
                <div>
                    <FontAwesomeIcon icon={faCommentDots} /> {videoData.comments_count}
                </div>
                <div>
                    <FontAwesomeIcon icon={faBookmark} /> {videoData.bookmarks_count}
                </div>
                <div>
                    <FontAwesomeIcon icon={faLink} /> Copy link
                </div>
            </div>

            <div className={cx('tabs-action')}>
                <div
                    className={cx('tab', 'tab-comments', { active: activeTab === 'comments' })}
                    onClick={() => setActiveTab('comments')}
                >
                    Comments (47)
                </div>
                <div
                    className={cx('tab', 'tab-creator-videos', { active: activeTab === 'creatorVideos' })}
                    onClick={() => setActiveTab('creatorVideos')}
                >
                    Creator videos
                </div>
            </div>

            <div className={cx('comments-section')}>
                {comments.map((comment) => (
                    <div key={comment.uuid} className={cx('comment-wrapper')}>
                        <div className={cx('comment')}>
                            <Image
                                src="https://via.placeholder.com/40"
                                alt="user avatar"
                                className={cx('comment-avatar')}
                            />
                            <div className={cx('comment-content')}>
                                <strong>{comment.user}</strong>
                                <p>{comment.content}</p>
                                <span className={cx('comment-time')}>{comment.time}</span>
                                <span className={cx('reply-btn')} onClick={() => toggleReply(comment.id)}>
                                    Reply
                                </span>
                            </div>
                            <span className={cx('comment-likes')}>
                                <FontAwesomeIcon icon={faHeartRegular} /> {comment.likes}
                            </span>
                        </div>

                        {replyVisible[comment.uuid] && comment.replies.length > 0 && (
                            <div className={cx('replies')}>
                                {comment.replies.map((reply) => (
                                    <div key={reply.uuid} className={cx('reply-comment')}>
                                        <Image
                                            src="https://via.placeholder.com/35"
                                            alt="user avatar"
                                            className={cx('comment-avatar')}
                                        />
                                        <div className={cx('comment-content')}>
                                            <strong>{reply.user}</strong>
                                            <p>{reply.content}</p>
                                            <span className={cx('comment-time')}>{reply.time}</span>
                                        </div>
                                        <span className={cx('comment-likes')}>
                                            <FontAwesomeIcon icon={faHeartRegular} /> {reply.likes}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={cx('comment-input')}>
                <input
                    type="text"
                    placeholder="Add comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handlePostComment} disabled={loading}>
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </div>
        </div>
    );
}

export default VideoDescription;

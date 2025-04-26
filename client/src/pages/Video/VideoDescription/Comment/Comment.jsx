import { useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import Image from '~/components/Image';
import Button from '~/components/Button';
import CommentInput from '../CommentInput';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

function Comment({ comment, handlePostReply }) {
    const { t } = useTranslation();
    const [replyVisible, setReplyVisible] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const toggleReply = () => {
        setReplyVisible(!replyVisible);
    };

    const toggleShowReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div key={comment.uuid} className={cx('wrapper')}>
            <div className={cx('comment')}>
                <Image src={comment.user.avatar} className={cx('avatar')} alt={comment.user.full_name} />
                <div className={cx('content')}>
                    <strong>{comment.user.full_name}</strong>
                    <p>{comment.content}</p>
                    <span className={cx('time')}>{dayjs.unix(comment.updated_at).fromNow()}</span>
                    <span className={cx('reply-btn')} onClick={toggleReply}>
                        {t('VIDEO.VIDEO_DESCRIPTION.REPLY')}
                    </span>
                </div>
                <span className={cx('likes')}>
                    <FontAwesomeIcon icon={faHeart} />
                    &nbsp;{comment.likes_count}
                </span>
            </div>

            {replyVisible && <CommentInput onPost={handlePostReply} className={cx('comment-input-reply')} />}

            {comment?.replies?.length > 0 && !showReplies && (
                <Button
                    text
                    rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
                    className={cx('show-more')}
                    onClick={toggleShowReplies}
                >
                    {t('VIDEO.VIDEO_DESCRIPTION.SHOW_MORE')}
                </Button>
            )}

            {showReplies && (
                <div className={cx('replies')}>
                    {comment.replies.map((reply) => (
                        <div key={reply.uuid} className={cx('comment')}>
                            <Image src={reply.user.avatar} className={cx('avatar')} alt={reply.user.full_name} />
                            <div className={cx('content')}>
                                <strong>{reply.user.full_name}</strong>
                                <p>{reply.content}</p>
                                <span className={cx('time')}>{dayjs.unix(reply.updated_at).fromNow()}</span>
                            </div>
                            <span className={cx('likes')}>
                                <FontAwesomeIcon icon={faHeart} />
                                &nbsp;{reply.likes_count}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Comment;

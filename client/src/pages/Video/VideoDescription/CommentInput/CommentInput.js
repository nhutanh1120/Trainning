import { useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './CommentInput.module.scss';

const cx = classNames.bind(styles);

function CommentInput({ onPost, placeholder, className }) {
    const { t } = useTranslation();
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePost = async () => {
        if (!comment.trim()) return;
        setIsLoading(true);
        await onPost(comment);
        setComment('');
        setIsLoading(false);
    };

    return (
        <div className={cx('wrapper', className)}>
            <input
                type="text"
                placeholder={placeholder || t('VIDEO.VIDEO_DESCRIPTION.COMMENT_INPUT.PLACEHOLDER')}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handlePost} disabled={isLoading}>
                {isLoading
                    ? t('VIDEO.VIDEO_DESCRIPTION.COMMENT_INPUT.POSTING')
                    : t('VIDEO.VIDEO_DESCRIPTION.COMMENT_INPUT.POST')}
            </button>
        </div>
    );
}

export default CommentInput;

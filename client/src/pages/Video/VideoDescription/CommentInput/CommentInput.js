import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentInput.module.scss';

const cx = classNames.bind(styles);

function CommentInput({ onPost, placeholder = 'Add a comment...', className }) {
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
            <input type="text" placeholder={placeholder} value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={handlePost} disabled={isLoading}>
                {isLoading ? 'Posting...' : 'Post'}
            </button>
        </div>
    );
}

export default CommentInput;

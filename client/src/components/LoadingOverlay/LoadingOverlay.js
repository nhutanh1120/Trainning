import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LoadingOverlay.module.scss';

const cx = classNames.bind(styles);

function LoadingOverlay({ loading = false, fullScreen = false, className, children }) {
    if (fullScreen && loading) {
        return (
            <div className={cx('overlay', 'fullScreen')}>
                <div className={cx('spinner')} />
            </div>
        );
    }

    return (
        <div className={cx('wrapper', className)}>
            {children}

            {loading && (
                <div className={cx('overlay')}>
                    <div className={cx('spinner')} />
                </div>
            )}
        </div>
    );
}

LoadingOverlay.propTypes = {
    loading: PropTypes.bool,
    fullScreen: PropTypes.bool,
    children: PropTypes.node,
};

export default LoadingOverlay;

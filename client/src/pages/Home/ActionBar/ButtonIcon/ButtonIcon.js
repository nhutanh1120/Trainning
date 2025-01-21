import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ButtonIcon.module.scss';

const cx = classNames.bind(styles);

function ButtonIcon({ icon, count, active }) {
    return (
        <button className={cx('wrapper')}>
            <span className={cx('icon', { active: active })}>{icon}</span>
            <strong className={cx('count')}>{count}</strong>
        </button>
    );
}

ButtonIcon.propTypes = {
    icon: PropTypes.string,
    count: PropTypes.string,
    active: PropTypes.bool,
};

export default ButtonIcon;

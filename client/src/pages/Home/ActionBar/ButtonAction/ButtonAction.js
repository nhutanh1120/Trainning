import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ButtonIcon.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const ButtonAction = forwardRef(
    ({ type = 'icon', src, icon, count, active = false, to, onClick, ...passProps }, ref) => {
        let Comp = 'button';
        const props = {
            onClick,
            ref,
            ...passProps,
        };

        if (to) {
            props.to = to;
            Comp = Link;
        }

        if (type === 'img') {
            return (
                <Link to={to} className={cx('wrapper')}>
                    <img className={cx('icon')} src={src} alt="avatar" />
                    <button className={cx('action-icon', { active: active })} onClick={onClick}>
                        <FontAwesomeIcon icon={active ? faCheck : faPlus} />
                    </button>
                </Link>
            );
        }
        return (
            <Comp className={cx('wrapper')} {...props}>
                <span className={cx('icon', { active: active })}>{icon}</span>
                <strong className={cx('count')}>{count}</strong>
            </Comp>
        );
    },
);

ButtonAction.propTypes = {
    type: PropTypes.oneOf(['icon', 'img']),
    src: PropTypes.string,
    icon: PropTypes.node,
    count: PropTypes.string,
    active: PropTypes.bool,
    to: PropTypes.string,
    onClick: PropTypes.func,
};

export default ButtonAction;

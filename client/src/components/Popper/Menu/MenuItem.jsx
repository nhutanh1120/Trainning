import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ menuItem, onClick }) {
    const classes = cx('menu-item', {
        separate: menuItem.separate,
        active: menuItem.active,
    });
    return (
        <Button
            className={classes}
            leftIcon={menuItem.icon}
            rightIcon={menuItem.active && <FontAwesomeIcon icon={faCheck} />}
            to={menuItem.to}
            onClick={onClick}
        >
            {menuItem.title}
        </Button>
    );
}

MenuItem.propTypes = {
    menuItem: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;

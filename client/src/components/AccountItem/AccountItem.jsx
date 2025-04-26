import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ account }) {
    return (
        <Link to={`/@${account.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={account.avatar} alt={account.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{account.full_name}</span>
                    {account.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>{account.nickname}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    account: PropTypes.object.isRequired,
};

export default AccountItem;

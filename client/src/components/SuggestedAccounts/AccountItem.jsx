import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Image from '~/components/Image';
import Tooltip from '~/components/Tooltip';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview/AccountPreview';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ type = 'suggested', account }) {
    const renderPreview = (props) => {
        if (type === 'foryou') {
            return null;
        }

        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview account={account} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <Tooltip interactive delay={[800, 0]} offsetX={-10} placement="bottom" content={renderPreview}>
            <div className={cx('account-item')}>
                <Image className={cx('avatar')} src={account.avatar} alt={account.nickname} />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{account.nickname}</strong>
                        {account.tick !== 0 && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </p>
                    <p className={cx('name')}>{`${account.first_name} ${account.last_name}`}</p>
                </div>
            </div>
        </Tooltip>
    );
}

AccountItem.propTypes = {
    type: PropTypes.oneOf(['suggested', 'foryou']),
    account: PropTypes.object.isRequired,
};

export default AccountItem;

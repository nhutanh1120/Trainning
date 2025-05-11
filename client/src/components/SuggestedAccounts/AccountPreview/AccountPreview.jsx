import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import Image from '~/components/Image';
import { follows } from '~/services/userService';
import { useAuthModal } from '~/contexts/AuthModalContext';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ account }) {
    const { t } = useTranslation();
    const user = useSelector((state) => state.auth.user);
    const { openAuthModal } = useAuthModal();

    const handleFollows = async () => {
        if (account.uuid === undefined) {
            return;
        }

        await follows(account.uuid);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={account.avatar} alt={account.nickname} />
                <Button primary className={cx('follow-btn')} onClick={user ? handleFollows : openAuthModal}>
                    {t('COMPONENTS.ACCOUNTS.FOLLOW')}
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{account.nickname}</strong>
                    {account.tick !== 0 && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{`${account.first_name} ${account.last_name}`}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{account.followers_count}</strong>
                    <span className={cx('label')}>{t('COMPONENTS.ACCOUNTS.FOLLOWERS')}</span>
                    <strong className={cx('value')}>{account.likes_count}</strong>
                    <span className={cx('label')}>{t('COMPONENTS.ACCOUNTS.LIKES')}</span>
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    account: PropTypes.object.isRequired,
};

export default AccountPreview;

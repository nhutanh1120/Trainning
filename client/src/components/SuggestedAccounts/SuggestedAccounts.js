import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, data = [], hasMore, onClick }) {
    const { t } = useTranslation();

    if (!data.length) {
        return null;
    }

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map((account) => (
                <AccountItem key={account.uuid} data={account} />
            ))}

            <p className={cx('more-btn')} onClick={onClick}>
                {hasMore ? t('LAYOUTS.SIDEBAR.SEE_ALL') : t('LAYOUTS.SIDEBAR.SEE_LESS')}
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    hasMore: PropTypes.bool,
    onClick: PropTypes.func,
};

export default SuggestedAccounts;

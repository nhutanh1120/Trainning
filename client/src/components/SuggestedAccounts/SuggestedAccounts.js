import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import AccountItem from './AccountItem';
import LoadingOverlay from './../LoadingOverlay';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function SuggestedAccounts({ loading = false, label, data = [], hasMore, onClick }) {
    const { t } = useTranslation();

    if (!data.length) {
        return (
            <div className={cx('wrapper')}>
                <p className={cx('label')}>{label}</p>

                <LoadingOverlay loading={loading} fullScreen={false}>
                    <div className={cx('empty')}>{t('COMMON.EMPTY_TEXT')}</div>
                </LoadingOverlay>
            </div>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            <LoadingOverlay loading={loading} fullScreen={false}>
                {data.map((account) => (
                    <AccountItem key={account.uuid} data={account} />
                ))}

                {data.length >= 5 && (
                    <p className={cx('more-btn')} onClick={onClick}>
                        {hasMore ? t('LAYOUTS.SIDEBAR.SEE_ALL') : t('LAYOUTS.SIDEBAR.SEE_LESS')}
                    </p>
                )}
            </LoadingOverlay>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    loading: PropTypes.bool,
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    hasMore: PropTypes.bool,
    onClick: PropTypes.func,
};

export default SuggestedAccounts;

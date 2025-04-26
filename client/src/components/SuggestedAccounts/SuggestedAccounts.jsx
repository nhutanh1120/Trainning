import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import * as userService from '~/services/userService';
import AccountItem from './AccountItem';
import LoadingOverlay from '../LoadingOverlay';
import styles from './SuggestedAccounts.module.scss';

const PAGE_SIZE = 5;
const cx = classNames.bind(styles);

function SuggestedAccounts({ label, type = 'suggested' }) {
    const { t } = useTranslation();
    const [initialData, setInitialData] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchAccounts = async (newPage) => {
        if (0 < totalCount && totalCount <= initialData.length) {
            const newData = initialData.slice(0, newPage * PAGE_SIZE);
            setPage(newPage);
            setAccounts(newData);
            setHasMore(newData.length < initialData.length);
            return;
        }

        setLoading(true);
        const res = await userService.getSuggested({ page: newPage, page_size: PAGE_SIZE, type });
        setLoading(false);

        if (!res || !Array.isArray(res.items)) return;

        const updatedData = [...initialData, ...res.items];
        setInitialData(updatedData);
        setAccounts(updatedData);

        setPage(newPage);
        setTotalCount(res.pagination?.totalCount || 0);
        setHasMore(updatedData.length < res.pagination?.totalCount);
    };

    const handleToggle = () => {
        if (hasMore) {
            fetchAccounts(page + 1);
        } else {
            setPage(1);
            setHasMore(true);
            setAccounts(initialData.slice(0, PAGE_SIZE));
        }
    };

    useEffect(() => {
        fetchAccounts(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!accounts.length) {
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
                {accounts.map((account) => (
                    <AccountItem key={account.uuid} type={type} account={account} />
                ))}

                {accounts.length >= 5 && (
                    <p className={cx('more-btn')} onClick={handleToggle}>
                        {hasMore ? t('LAYOUTS.SIDEBAR.SEE_ALL') : t('LAYOUTS.SIDEBAR.SEE_LESS')}
                    </p>
                )}
            </LoadingOverlay>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['suggested', 'foryou']),
};

export default SuggestedAccounts;

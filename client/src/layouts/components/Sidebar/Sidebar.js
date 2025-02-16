import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import * as userService from '~/services/userService';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import LoadingOverlay from '~/components/LoadingOverlay';
import config from '~/config';
import About from './About';
import styles from './Sidebar.module.scss';

const PAGE_SIZE = 5;
const cx = classNames.bind(styles);

function Sidebar() {
    const { t } = useTranslation();
    const [initialData, setInitialData] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSuggestedUsers(1);
    }, []);

    const fetchSuggestedUsers = async (newPage) => {
        if (0 < totalCount && totalCount <= initialData.length) {
            const newData = initialData.slice(0, newPage * PAGE_SIZE);
            setPage(newPage);
            setSuggestedUsers(newData);
            setHasMore(newData.length < initialData.length);
            return;
        }

        setLoading(true);
        const data = await userService.getSuggested({ page: newPage, page_size: PAGE_SIZE });
        setLoading(false);

        if (!data || data.length === 0) {
            setHasMore(false);
            return;
        }

        const updatedData = [...initialData, ...data.items];
        setInitialData(updatedData);
        setSuggestedUsers(updatedData);

        setPage(newPage);
        setTotalCount(data.pagination.totalCount);
        setHasMore(updatedData.length < data.pagination.totalCount);
    };

    const handleShowMore = () => {
        fetchSuggestedUsers(page + 1);
    };

    const handleCollapse = () => {
        setPage(1);
        setHasMore(true);
        setSuggestedUsers(initialData.slice(0, PAGE_SIZE));
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title={t('LAYOUTS.SIDEBAR.FOR_YOU')}
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title={t('LAYOUTS.SIDEBAR.FOLLOWING')}
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem
                    title={t('LAYOUTS.SIDEBAR.LIVE')}
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />
            </Menu>

            <LoadingOverlay loading={loading} fullScreen={false}>
                <SuggestedAccounts
                    label={t('LAYOUTS.SIDEBAR.SUGGESTED_ACCOUNTS')}
                    data={suggestedUsers}
                    hasMore={hasMore}
                    onClick={hasMore ? handleShowMore : handleCollapse}
                />
            </LoadingOverlay>

            <SuggestedAccounts label={t('LAYOUTS.SIDEBAR.FOLLOWING_ACCOUNTS')} />

            <About />
        </aside>
    );
}

export default Sidebar;

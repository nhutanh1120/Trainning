import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';
import config from '~/config';
import About from './About';

const PAGE_SIZE = 5;
const cx = classNames.bind(styles);

function Sidebar() {
    const { t } = useTranslation();
    const [initialData, setInitialData] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchSuggestedUsers(1);
    }, []);

    const fetchSuggestedUsers = async (newPage) => {
        if (initialData.length >= newPage * PAGE_SIZE) {
            const newData = initialData.slice(0, newPage * PAGE_SIZE);
            setSuggestedUsers(newData);
            setHasMore(newData.length < initialData.length);
            setPage(newPage);
            return;
        }
        const data = await userService.getSuggested({ page: newPage, page_size: PAGE_SIZE });
        const updatedData = [...initialData, ...data.items];

        setInitialData(updatedData);
        setSuggestedUsers(updatedData);

        setPage(newPage);
        setHasMore(updatedData.length < data.pagination.totalCount);
    };

    const handleShowMore = () => {
        fetchSuggestedUsers(page + 1);
    };

    const handleCollapse = () => {
        setSuggestedUsers(initialData.slice(0, PAGE_SIZE));
        setPage(1);
        setHasMore(true);
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

            <SuggestedAccounts
                label={t('LAYOUTS.SIDEBAR.SUGGESTED_ACCOUNTS')}
                data={suggestedUsers}
                hasMore={hasMore}
                onClick={hasMore ? handleShowMore : handleCollapse}
            />
            <SuggestedAccounts label={t('LAYOUTS.SIDEBAR.FOLLOWING_ACCOUNTS')} />

            <About />
        </aside>
    );
}

export default Sidebar;

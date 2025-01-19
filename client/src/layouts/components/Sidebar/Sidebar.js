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

const cx = classNames.bind(styles);

function Sidebar() {
    const { t } = useTranslation();
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        userService.getSuggested({ page: 1, perPage: 5 }).then((data) => {
            setSuggestedUsers(data);
        });
    }, []);

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

            <SuggestedAccounts label={t('LAYOUTS.SIDEBAR.SUGGESTED_ACCOUNTS')} data={suggestedUsers} />
            <SuggestedAccounts label={t('LAYOUTS.SIDEBAR.FOLLOWING_ACCOUNTS')} />

            <About />
        </aside>
    );
}

export default Sidebar;

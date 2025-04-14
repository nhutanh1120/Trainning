import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
import config from '~/config';
import About from './About';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const { t } = useTranslation();
    const user = useSelector((state) => state.auth.user);

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

            <SuggestedAccounts type="suggested" label={t('LAYOUTS.SIDEBAR.SUGGESTED_ACCOUNTS')} />

            {user && <SuggestedAccounts type="foryou" label={t('LAYOUTS.SIDEBAR.FOLLOWING_ACCOUNTS')} />}

            <About />
        </aside>
    );
}

export default Sidebar;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import config from '~/config';

export const getMenuItems = (t, activeLanguage) => [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: t('LAYOUTS.HEADER.MENU.LANGUAGE'),
        children: {
            title: t('LAYOUTS.HEADER.MENU.LANGUAGE'),
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: t('LAYOUTS.HEADER.MENU.ENGLISH'),
                    active: activeLanguage === 'en',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: t('LAYOUTS.HEADER.MENU.VIETNAMESE'),
                    active: activeLanguage === 'vi',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: t('LAYOUTS.HEADER.MENU.FEEDBACK_HELP'),
        to: config.routes.feedback,
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: t('LAYOUTS.HEADER.MENU.KEYBOARD_SHORTCUTS'),
    },
];

export const useMenuItems = () => {
    const { t, i18n } = useTranslation();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        setMenuItems(getMenuItems(t, i18n.language));
    }, [t, i18n.language]);

    return menuItems;
};

export const getUserMenu = (uuid, t, activeLanguage) => [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: t('LAYOUTS.HEADER.MENU.VIEW_PROFILE'),
        to: `${config.routes.coin}${uuid}`,
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: t('LAYOUTS.HEADER.MENU.GET_COINS'),
        to: config.routes.coin,
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: t('LAYOUTS.HEADER.MENU.SETTINGS'),
        to: config.routes.settings,
    },
    ...getMenuItems(t, activeLanguage),
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: t('LAYOUTS.HEADER.MENU.LOGOUT'),
        to: config.routes.logout,
        separate: true,
    },
];

export const useUserMenu = () => {
    const user = useSelector((state) => state.auth.user);
    const { t, i18n } = useTranslation();
    const [userMenu, setUserMenu] = useState([]);

    useEffect(() => {
        if (user?.uuid) {
            setUserMenu(getUserMenu(user.uuid, t, i18n.language));
        }
    }, [user, t, i18n.language]);

    return userMenu;
};

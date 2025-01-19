import { useState, useEffect } from 'react';
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
        to: '/feedback',
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

export const getUserMenu = (t, activeLanguage) => [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: t('LAYOUTS.HEADER.MENU.VIEW_PROFILE'),
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: t('LAYOUTS.HEADER.MENU.GET_COINS'),
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: t('LAYOUTS.HEADER.MENU.SETTINGS'),
        to: '/settings',
    },
    ...getMenuItems(t, activeLanguage),
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: t('LAYOUTS.HEADER.MENU.LOGOUT'),
        to: '/logout',
        separate: true,
    },
];

export const useUserMenu = () => {
    const { t, i18n } = useTranslation();
    const [userMenu, setUserMenu] = useState([]);

    useEffect(() => {
        setUserMenu(getUserMenu(t, i18n.language));
    }, [t, i18n.language]);

    return userMenu;
};

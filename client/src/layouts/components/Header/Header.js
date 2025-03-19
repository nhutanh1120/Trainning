import { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import Button from '~/components/Button';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from './../Search';
import AuthModal from './../AuthModal';
import { useMenuItems, useUserMenu } from './../Utils';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const menuItems = useMenuItems();
    const userMenu = useUserMenu();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const user = useSelector((state) => state.auth.user);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                moment.locale(menuItem.code);
                i18n.changeLanguage(menuItem.code);
                localStorage.setItem('language', menuItem.code);
                break;
            default:
        }
    };

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt={t('LAYOUTS.HEADER.LOGO.ALT')} />
                    </Link>

                    <Search />

                    <div className={cx('actions')}>
                        {user ? (
                            <>
                                <Tippy
                                    delay={[0, 50]}
                                    content={t('LAYOUTS.HEADER.BUTTON.UPLOAD_VIDEO.CONTENT')}
                                    placement="bottom"
                                >
                                    <button onClick={() => navigate(config.routes.upload)} className={cx('action-btn')}>
                                        <UploadIcon />
                                    </button>
                                </Tippy>
                                <Tippy
                                    delay={[0, 50]}
                                    content={t('LAYOUTS.HEADER.BUTTON.MESSAGE.CONTENT')}
                                    placement="bottom"
                                >
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                                <Tippy
                                    delay={[0, 50]}
                                    content={t('LAYOUTS.HEADER.BUTTON.INBOX.CONTENT')}
                                    placement="bottom"
                                >
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        <span className={cx('badge')}>12</span>
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Button text onClick={() => setIsAuthModalOpen(true)}>
                                    {t('LAYOUTS.HEADER.BUTTON.UPLOAD')}
                                </Button>
                                <Button primary onClick={() => setIsAuthModalOpen(true)}>
                                    {t('LAYOUTS.HEADER.BUTTON.LOGIN')}
                                </Button>
                            </>
                        )}

                        <Menu items={user ? userMenu : menuItems} onChange={handleMenuChange}>
                            {user ? (
                                <Image className={cx('user-avatar')} src={user.avatar} alt={user.full_name} />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    </div>
                </div>
            </header>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
}

export default Header;

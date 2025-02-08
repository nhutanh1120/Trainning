import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from './../Search';
import AuthModal from './../AuthModal';
import { useMenuItems, useUserMenu } from './../Utils';

const cx = classNames.bind(styles);

function Header() {
    const currentUser = false;
    const { t, i18n } = useTranslation();
    const menuItems = useMenuItems();
    const userMenu = useUserMenu();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                i18n.changeLanguage(menuItem.code);
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
                        {currentUser ? (
                            <>
                                <Tippy
                                    delay={[0, 50]}
                                    content={t('LAYOUTS.HEADER.BUTTON.UPLOAD_VIDEO.CONTENT')}
                                    placement="bottom"
                                >
                                    <button className={cx('action-btn')}>
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
                                <Button text>{t('LAYOUTS.HEADER.BUTTON.UPLOAD')}</Button>
                                <Button primary onClick={() => setIsAuthModalOpen(true)}>
                                    {t('LAYOUTS.HEADER.BUTTON.LOGIN')}
                                </Button>
                            </>
                        )}

                        <Menu items={currentUser ? userMenu : menuItems} onChange={handleMenuChange}>
                            {currentUser ? (
                                <Image
                                    className={cx('user-avatar')}
                                    src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                                    alt="Nguyen Van A"
                                />
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

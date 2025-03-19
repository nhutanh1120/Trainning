import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

function About() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <div className={cx('wrapper')}>
            <p>{t('LAYOUTS.SIDEBAR.ABOUT.SECTION_1')}</p>
            <p>{t('LAYOUTS.SIDEBAR.ABOUT.SECTION_2')}</p>
            <p>{t('LAYOUTS.SIDEBAR.ABOUT.SECTION_3')}</p>
            <p>{t('LAYOUTS.SIDEBAR.ABOUT.COPYRIGHT', { year })}</p>
        </div>
    );
}

export default About;

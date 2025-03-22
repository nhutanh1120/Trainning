import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import FormInput from './FormInput';
import { useAuthModal } from '~/contexts/AuthModalContext';
import { loginUser, registerUser } from '~/redux/authSlice';
// import { login, register } from '~/services/authService';
import { CloseIcon } from '~/components/Icons';
import styles from './AuthModal.module.scss';

const cx = classNames.bind(styles);

function AuthModal() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isAuthModalOpen, closeAuthModal } = useAuthModal();
    const { loading, error } = useSelector((state) => state.auth);
    const [isLoginMode, setIsLoginMode] = useState(true); // true: Login, false: Register

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    // Reset state when switching between login and register modes
    useEffect(() => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        // setError('');
        setConfirmPasswordError('');
    }, [isLoginMode]);

    const isFormValid = () => {
        if (isLoginMode) {
            return username && password;
        } else {
            return username && password && confirmPassword && password === confirmPassword;
        }
    };

    const handleConfirmPasswordBlur = () => {
        setConfirmPasswordError(password !== confirmPassword ? t('LAYOUTS.AUTH.ERROR.PASSWORD_MISMATCH') : '');
    };

    // const handleSubmit = async () => {
    //     setLoading(true);
    //     setError('');
    //     try {
    //         const payload = {
    //             username,
    //             password,
    //         };

    //         let response;
    //         if (isLoginMode) {
    //             response = await login(payload);
    //         } else {
    //             response = await register(payload);
    //         }

    //         if (response.data.success) {
    //             closeAuthModal();
    //         } else {
    //             setError(response.data.message || t('LAYOUTS.AUTH.ERROR.GENERIC'));
    //         }
    //     } catch (error) {
    //         setError(t('LAYOUTS.AUTH.ERROR.SERVER'));
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async () => {
        const payload = { username, password };

        if (isLoginMode) {
            dispatch(loginUser(payload)).then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    localStorage.setItem('isLoginMode', 'true');
                    closeAuthModal();
                }
            });
        } else {
            dispatch(registerUser(payload)).then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    localStorage.setItem('isLoginMode', 'true');
                    closeAuthModal();
                }
            });
        }
    };

    if (!isAuthModalOpen) return null;

    return (
        <div className={cx('modal-overlay')}>
            <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('modal-body')}>
                    <h1 className={cx('modal-title')}>
                        {isLoginMode ? t('LAYOUTS.AUTH.LOGIN_TITLE') : t('LAYOUTS.AUTH.REGISTER_TITLE')}
                    </h1>

                    {/* Form */}
                    <div className="form">
                        <div className={cx('label')}>{t('LAYOUTS.AUTH.FORM_ITEM.USERNAME_FIELD.LABEL')}</div>
                        <FormInput
                            type="text"
                            value={username}
                            placeholder={t('LAYOUTS.AUTH.FORM_ITEM.USERNAME_FIELD.PLACEHOLDER')}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FormInput
                            type="password"
                            value={password}
                            placeholder={t('LAYOUTS.AUTH.FORM_ITEM.PASSWORD_FIELD.PLACEHOLDER')}
                            onChange={(e) => setPassword(e.target.value)}
                            isPassword
                        />
                        {!isLoginMode && (
                            <FormInput
                                type="password"
                                value={confirmPassword}
                                placeholder={t('LAYOUTS.AUTH.FORM_ITEM.CONFIRM_PASSWORD_FIELD.PLACEHOLDER')}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={handleConfirmPasswordBlur}
                                errorMessage={confirmPasswordError}
                                isPassword
                            />
                        )}
                        {isLoginMode && (
                            <Button text small className={cx('forgot-password')}>
                                {t('LAYOUTS.AUTH.FORGOT_PASSWORD_BUTTON')}
                            </Button>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        primary
                        disabled={loading || !isFormValid()}
                        className={cx('submit-button')}
                        onClick={handleSubmit}
                    >
                        {loading
                            ? t('LAYOUTS.AUTH.LOADING')
                            : isLoginMode
                            ? t('LAYOUTS.AUTH.LOGIN_TITLE')
                            : t('LAYOUTS.AUTH.REGISTER_TITLE')}
                    </Button>

                    {/* Error message */}
                    {error && <div className={cx('error-message')}>{error}</div>}

                    <button className={cx('close-button')} onClick={closeAuthModal}>
                        <CloseIcon width="2.4rem" height="2.4rem" />
                    </button>
                </div>

                {/* Toggle between Login and Register */}
                <div className={cx('switch-mode')}>
                    {isLoginMode ? t('LAYOUTS.AUTH.NO_ACCOUNT_TITLE') : t('LAYOUTS.AUTH.HAVE_ACCOUNT_TITLE')}
                    <Button text small className={cx('switch-button')} onClick={() => setIsLoginMode(!isLoginMode)}>
                        {isLoginMode ? t('LAYOUTS.AUTH.REGISTER_TITLE') : t('LAYOUTS.AUTH.LOGIN_TITLE')}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;

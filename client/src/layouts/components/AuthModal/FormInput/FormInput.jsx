import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

function FormInput({ type, value, placeholder, onChange, onBlur, errorMessage, isPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={cx('form-group')}>
            <input
                type={isPassword && showPassword ? 'text' : type}
                value={value}
                placeholder={placeholder}
                className={cx('input', { 'input-error': errorMessage })}
                onChange={onChange}
                onBlur={onBlur}
            />
            {isPassword && (
                <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className={cx('eye-icon')}
                    onClick={() => setShowPassword(!showPassword)}
                />
            )}
            {errorMessage && <div className={cx('error-message')}>{errorMessage}</div>}
        </div>
    );
}

FormInput.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    errorMessage: PropTypes.string,
    isPassword: PropTypes.bool,
};

export default FormInput;

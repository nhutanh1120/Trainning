import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import config from '~/config';
import { logoutUser } from '~/redux/authSlice';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutUser());
        navigate(config.routes.home);
        localStorage.removeItem('isLoginMode');
    }, [dispatch, navigate]);

    return <h2>Đang đăng xuất...</h2>;
}

export default Logout;

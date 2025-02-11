import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '~/redux/authSlice';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutUser());
        navigate('/');
    }, [dispatch, navigate]);

    return <h2>Đang đăng xuất...</h2>;
}

export default Logout;

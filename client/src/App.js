import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { fetchUser } from '~/redux/authSlice';
import DefaultLayout from '~/layouts';
import moment from 'moment';
import 'moment/locale/vi';
import '~/i18n/i18n';

function App() {
    const dispatch = useDispatch();
    const { i18n } = useTranslation();

    useEffect(() => {
        const isLoginMode = localStorage.getItem('isLoginMode');

        if (isLoginMode) {
            dispatch(fetchUser());
        }
    }, [dispatch]);

    useEffect(() => {
        const language = localStorage.getItem('language') || 'en';
        i18n.changeLanguage(language);
        moment.locale(language === 'vi' ? 'vi' : 'en');
    }, [i18n]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './redux/store';
import { AuthModalProvider } from '~/contexts/AuthModalContext';
import GlobalStyles from './components/GlobalStyles';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Provider store={store}>
        <AuthModalProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </AuthModalProvider>
    </Provider>,
    // </StrictMode>,
);

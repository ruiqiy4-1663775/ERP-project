import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './main/Routes';
import { ModalProvider } from './utils/ModalContext';
import store from './redux/store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ModalProvider>
                <Routes />
            </ModalProvider>
        </Provider>
    </React.StrictMode>
);


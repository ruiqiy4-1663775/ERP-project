import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './main/Routes';
import { ModalProvider } from './utils/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ModalProvider>
            <Routes />
            </ModalProvider>
    </React.StrictMode>
);


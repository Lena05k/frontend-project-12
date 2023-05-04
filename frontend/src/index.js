import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './i18n';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './slices/index';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();

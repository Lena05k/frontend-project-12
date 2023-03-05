import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.jsx';
import App from './components/App';
// import {Provider} from 'react-redux';
// import store from './slices/index';

const Init = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default Init;

// <Provider store={store}>
//
// </Provider>

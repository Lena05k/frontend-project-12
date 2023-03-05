import i18next from "i18next";
import {I18nextProvider, initReactI18next} from 'react-i18next';
import React from "react";
import App from './components/App';
import resources from "./locales";

const Init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      resources,
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default Init;
// import {Provider} from 'react-redux';
// import store from './slices/index';
// <Provider store={store}>
//
// </Provider>

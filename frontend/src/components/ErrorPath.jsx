import { useTranslation } from 'react-i18next';
import errorImage from '../assets/not-found.svg';

const ErrorPath = () => {
  const { t } = useTranslation();
  return(
    <div className="text-center" id="error-page">
      <img
        alt="Страница не найдена"
        style={{ height: '200px', width: '200px' }}
        src={errorImage}
      />
      <h1 className="h4 text-muted">{t('PageNotFound')}</h1>
      <p className="text-muted">
        {t('YouCanChangeover')}
        <a href="/">{t('GoToMain')}</a>
      </p>
    </div>
  );
};

export default ErrorPath;

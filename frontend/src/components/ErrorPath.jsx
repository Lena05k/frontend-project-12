import { useTranslation } from 'react-i18next';

const ErrorPath = () => {
  const { t } = useTranslation();
  return(
    <div className="text-center" id="error-page">
      <h1 className="h4 text-muted">{t('titles.pageNotFound')}</h1>
      <p className="text-muted">
        {t('links.toMainPage_title')}
        <a href="/">{t('links.toMainPage_text')}</a>
      </p>
    </div>
  );
};

export default ErrorPath;

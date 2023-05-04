import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import page404 from '../images/page-404.svg';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        src={page404}
        alt={t('titles.pageNotFound')}
        className="img-fluid h-25"
      />
      <h1 className="h4 text-muted">{t('titles.pageNotFound')}</h1>
      <p className="text-muted">
        {t('links.toMainPage_title')}
        {' '}
        <Link to="/">{t('links.toMainPage_text')}</Link>
      </p>
    </div>
  );
};
export default ErrorPage;

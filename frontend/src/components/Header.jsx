import { useContext } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../contexts';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loggedIn, logOut } = useContext(AuthContext);

  const handleClick = () => {
    logOut();
    navigate('/login');
  };

  return (
    <Navbar className="shadow-sm bg-white" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">{t('titles.headerLogo')}</Link>
        {loggedIn && <Button onClick={handleClick}>{t('buttonNames.logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;

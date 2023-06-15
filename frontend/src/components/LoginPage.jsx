import {
  useState,
  useRef,
  useEffect,
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useAuth } from '../hooks';
import { toast } from 'react-toastify';
import routes from '../routes';
import loginImage from '../assets/avatar.jpg';

const Login = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authError, setAuthError] = useState(false);
  const noLoginPassword = t('yup.errors.authError');
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthError(false);
      const { username, password } = values;

      return axios.post(routes.apiLoginPath(), { username, password })
        .then((response) => {
          auth.logIn(response.data);
          navigate('/');
        })
        .catch((error) => {
          formik.setSubmitting(false);
          if (error.isAxiosError && error.response?.status === 401) {
            setAuthError(true);
            inputRef.current.select();
            return;
          }

          toast.error(t('yup.errors.networkError'));
          throw (error);
        });
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card>
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} className="rounded-circle" alt={t('titles.login')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('titles.login')}</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    placeholder={t('forms.login.userName')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    isInvalid={authError}
                    required
                  />
                  <Form.Label htmlFor="username">{t('forms.login.userName')}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t('forms.login.password')}
                    onChange={formik.handleChange}
                    isInvalid={authError}
                    required
                  />
                  <Form.Label htmlFor="password">{t('forms.login.password')}</Form.Label>
                  <div className="invalid-tooltip">
                    {formik.errors.password || noLoginPassword}
                  </div>
                </Form.Group>
                <Button variant="outline-primary" className="w-100 mb-3" type="submit">
                  {t('buttonNames.login')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('titles.noAccount')}</span>
                {' '}
                <Link to="/signup">{t('titles.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;

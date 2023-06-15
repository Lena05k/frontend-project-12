import {
  useState,
  useRef,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useAuth } from '../hooks';
import routes from '../routes';
import signUpImage from '../assets/avatar_1.jpg';

const SignUp = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();

  const [signUpError, setSignUpError] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .required(t('yup.errors.required'))
      .min(3, t('yup.errors.userNameLength'))
      .max(20, t('yup.errors.userNameLength')),
    password: yup.string()
      .required(t('yup.errors.required'))
      .min(6, t('yup.errors.passwordLength')),
    retypePassword: yup.string()
      .required(t('yup.errors.required'))
      .oneOf([yup.ref('password')], t('yup.errors.passwordsDiffer')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      retypePassword: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setSignUpError(false);
      const { username, password } = values;
      axios.post(routes.apiSignupPath(), { username, password })
        .then((response) => {
          auth.logIn(response.data);
          navigate('/');
        })
        .catch((error) => {
          if (error.isAxiosError && error.response.status === 401) {
            inputEl.current.select();
            return;
          }

          if (error.response && error.response.status === 409) {
            toast.error(t('yup.errors.userAlreadyExists'));
          }

          if (error.message === 'Network Error') {
            toast.error(t('yup.errors.networkError'));
          }

          toast.error(t('yup.errors.requestError'));
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
                <img src={signUpImage} className="rounded-circle" alt={t('titles.signup')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('titles.signup')}</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    placeholder={t('forms.signup.userName')}
                    isInvalid={signUpError}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    disabled={formik.isSubmitting}
                    noValidate
                  />
                  <Form.Label htmlFor="username">{t('forms.signup.userName')}</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.username}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t('forms.signup.password')}
                    isInvalid={signUpError}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    noValidate
                  />
                  <Form.Label htmlFor="password">{t('forms.signup.password')}</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.password}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="retypePassword"
                    name="retypePassword"
                    type="password"
                    placeholder={t('forms.signup.retypePassword')}
                    isInvalid={signUpError}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    noValidate
                  />
                  <Form.Label htmlFor="retypePassword">{t('forms.signup.retypePassword')}</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.retypePassword}
                  </Form.Text>
                  <Form.Text className="text-danger">
                    {signUpError}
                  </Form.Text>
                </Form.Group>
                <Button variant="outline-primary" disabled={formik.isSubmitting} className="w-100 mb-3" type="submit">
                  {t('buttonNames.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>

  );
};

export default SignUp;

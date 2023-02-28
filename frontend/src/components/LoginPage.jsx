import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { avatarImages } from '../assets/avatar.jpg';
import { AuthorizationContext } from '../../AuthorizationContext';
import { userLogin } from '../../routes';

const Login = () => {
  const { login } = useContext(AuthorizationContext);
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const { t } = useTranslation();
  const validationShema = yup.object().shape({
    username: yup.string().required('required'),
    password: yup.string().required('required'),
  });

  // как мне увидеть результать useEffect через консоли?
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      const request = (data) => {
        userLogin(data)
          .then((response) => login(response.data))
          .cath((error) => {
            if (!error.isAxiosError) {
              toast.error(t('errors.unknown'));
              return;
            }
            if (error.response?.status === 401) {
              setAuthFailed(true);
              inputRef.current.select();
            } else {
              toast.error(t('errors.network'));
            }
          });
      };
      request(values);
    },
    validationSchema: validationShema,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={avatarImages}
                  className="rounded-circle"
                  alt={t('titles.login')}
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    autoComplete="username"
                    ref={inputRef}
                    isInvalid={authFailed}
                    placeholder={t('forms.login.userName')}
                    required
                  />
                  <label htmlFor="username">{t('forms.login.userName')}</label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    placeholder={t('forms.login.password')}
                    required
                  />
                  <Form.Label htmlFor="password">{t('forms.login.password')}</Form.Label>
                  <div className="invalid-tooltip">
                    {authFailed || formik.errors.password}
                  </div>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                  {t('buttonNames.login')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('titles.noAccount')}</span>
                {' '}
                <Link to="/signup">{t('title.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

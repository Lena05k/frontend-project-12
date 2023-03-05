import React, { useEffect, useState, useRef, useContext } from 'react';
// import { useFormik } from 'formik';
import 'bootstrap';
// import { Form, Button } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import {Link, useNavigate} from 'react-router-dom';
// import axios from "axios";
// import avatarImages from '../assets/avatar.jpg';
// import routes from "../routes";
// import { LoginSchema } from '../utils/validation'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default Login;

//   const { t } = useTranslation();
//   const inputRef = useRef();
//   const navigate = useNavigate();
//   const { logIn } = useContext();
//   const [authFailed, setAuthFailed] = useState(false);
//
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);
//
//   const formik = useFormik({
//      initialValues: {
//         username: '',
//         password: '',
//       },
//       onSubmit: async (values) => {
//         setAuthFailed(false);
//
//         try {
//           const res = await axios.post(routes.loginPath(), values);
//           console.log('axios.post:',res);
//           if (res.status === 200) {
//             console.log('Res:',logIn(res.data));
//             const { form } = { form: { pathname: '/'} };
//             console.log('Form:', {form});
//             console.log(navigate(form));
//           }
//         } catch (error) {
//           formik.setSubmitting(false);
//           if (error.isAxiosError && error.response.status === 401) {
//             setAuthFailed(true);
//             inputRef.current.select();
//             return;
//           }
//           notify('error');
//           console.log(error);
//           throw Error('NetworkError');
//         }
//       },
//       validationSchema: LoginSchema,
//       validateOnChange: false,
//   });

// <div className="container-fluid h-100">
//   <div className="row justify-content-center align-content-center h-100">
//     <div className="col-12 col-md-8 col-xxl-6">
//       <div className="card shadow-sm">
//         <div className="card-body row p-5">
//           <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
//             <img
//               src={avatarImages}
//               className="rounded-circle"
//               alt={t('titles.login')}
//             />
//           </div>
//           <Form
//             onSubmit={formik.handleSubmit}
//             className="col-12 col-md-6 mt-3 mt-mb-0">
//             <h1 className="text-center mb-4">{}</h1>
//             <Form.Group className="form-floating mb-3">
//               <Form.Control
//                 onChange={formik.handleChange}
//                 value={formik.values.username}
//                 name="username"
//                 id="username"
//                 autoComplete="username"
//                 ref={inputRef}
//                 isInvalid={authFailed}
//                 placeholder={t('forms.login.userName')}
//                 required
//               />
//               <label htmlFor="username">{t('forms.login.userName')}</label>
//             </Form.Group>
//             <Form.Group className="form-floating mb-4">
//               <Form.Control
//                 type="password"
//                 onChange={formik.handleChange}
//                 value={formik.values.password}
//                 name="password"
//                 id="password"
//                 autoComplete="current-password"
//                 isInvalid={authFailed}
//                 placeholder={t('forms.login.password')}
//                 required
//               />
//               <Form.Label htmlFor="password">{t('forms.login.password')}</Form.Label>
//               <div className="invalid-tooltip">
//                 {authFailed || formik.errors.password}
//               </div>
//             </Form.Group>
//             <Button type="submit" variant="outline-primary" className="w-100 mb-3">
//               {t('buttonNames.login')}
//             </Button>
//           </Form>
//         </div>
//         <div className="card-footer p-4">
//           <div className="text-center">
//             <span>{t('titles.noAccount')}</span>
//             {' '}
//             <Link to="/signup">{t('title.signup')}</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import Header from './Header';
import MainPage from './MainPage';
import Login from './LoginPage';
import ErrorPage from './ErrorPage';
import { useAuth } from '../hooks';
import SignUp from './SignUpPage';
import { setError } from '../slices/userInterfaceSlice';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const { authToken: token } = window.localStorage;
  const { error } = useSelector((state) => state.ui);

  useEffect(() => {
    if (error) {
      toast.error(`${t('yup.errors.renderError')}: ${error.message}`);
      dispatch(setError(null));
    }
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={routes.root()} errorElement={<ErrorPage />}>
            <Route
              index
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path={routes.login()} element={<Login />} />
            <Route path={routes.signup()} element={<SignUp />} />
            <Route path={routes.notFound()} element={<ErrorPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;

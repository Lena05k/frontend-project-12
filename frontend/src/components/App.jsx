import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from '../routes';
import Header from './Header';
import MainPage from './MainPage';
import Login from './LoginPage';
import ErrorPage from './ErrorPage';
import { useAuth } from '../hooks';
import SignUp from './SignUpPage';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
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

export default App;

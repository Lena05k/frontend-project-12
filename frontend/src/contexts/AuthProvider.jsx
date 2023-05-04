import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import fetchInitialData from '../slices/fetchInitialData';
import { AuthContext } from '.';

const { authToken } = window.localStorage;

const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(!!authToken);

  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const memorizedValue = useMemo(() => {
    const logIn = (data, username) => {
      const { token } = data;
      dispatch(fetchInitialData(token));
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', username);
      setLoggedIn(true);
    };
    return { loggedIn, logIn, logOut };
  }, [loggedIn, dispatch]);

  return (
    <AuthContext.Provider value={memorizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

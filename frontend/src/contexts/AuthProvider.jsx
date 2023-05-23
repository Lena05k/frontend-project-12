import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import fetchInitialData from '../slices/fetchInitialData';
import { AuthContext } from '.';

const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('authToken'));

  const logIn = (data, username) => {
    const { token } = data;
    dispatch(fetchInitialData(token));
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', username);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setLoggedIn(false);
  };

  const memorizedValue = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={memorizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

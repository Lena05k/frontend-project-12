import { useState, useMemo } from 'react';
import { AuthContext } from '.';

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const logIn = (data) => {
    const { token } = data;
    localStorage.setItem('user', token);
    // localStorage.setItem('userName', username);
    setUser(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    // localStorage.removeItem('userName');
    setUser(false);
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('user');
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    return {};
  };

  const memorizedValue = useMemo(() => ({
    user,
    logIn,
    logOut,
    getAuthHeader,
  }), [user]);

  return (
    <AuthContext.Provider value={memorizedValue}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

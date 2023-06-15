import { useCallback, useState, useMemo } from 'react';
import { AuthContext } from '.';

const AuthContextProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user')) ?? null;
  const [user, setUser] = useState(currentUser);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem('user');
    if (token) {
      return {
        Authorization: `Bearer ${user.token}`,
      };
    }
    return {};
  };

  const memorizedValue = useMemo(() => ({
    user,
    logIn,
    logOut,
    getAuthHeader,
  }), [user, logIn, logOut, getAuthHeader]);

  return (
    <AuthContext.Provider value={memorizedValue}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

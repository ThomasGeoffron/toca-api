import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { getCurrentUser, login } from '../api/auth/auth';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [_user, setUser] = useState({});
  const [_token, setToken] = useState(JSON.parse(sessionStorage.getItem('toca-token')));

  useEffect(() => {
    if (_token) {
      getCurrentUser().then(({ data: user }) => {
        setUser(user);
      });
    }
  }, [_token]);

  function handleLogin(email, password) {
    return new Promise((_, reject) => {
      login(email, password)
        .then(({ data: loginData }) => {
          setToken({ token: loginData.token });
          sessionStorage.setItem('toca-token', JSON.stringify({ token: loginData.token }));
          navigate('/');
        })
        .catch((error) => {
          reject(error?.response?.data?.message || 'Une erreur est survenue');
        });
    });
  }

  const handleLogout = useCallback(() => {
    setToken(null);
    sessionStorage.removeItem('toca-token');
    window.location.href = '/login';
  });

  const value = useMemo(
    () => ({
      token: _token,
      setToken,
      user: _user,
      login: handleLogin,
      logout: handleLogout,
    }),
    [_token, _user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

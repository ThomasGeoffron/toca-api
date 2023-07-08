import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../api/auth/auth';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [_user, setUser] = useState({});
  const [_token, setToken] = useState(sessionStorage.getItem('toca-token'));

  useEffect(() => {
    sessionStorage.setItem('toca-token', _token);
  }, [_token]);

  function handleLogin(email, password) {
    return new Promise((_, reject) => {
      login(email, password)
        .then(({ data: user }) => {
          setToken(user.token);
          setUser(user);
          navigate('/');
        })
        .catch((error) => {
          reject(error?.response?.data?.message || 'Une erreur est survenue');
        });
    });
  }

  const handleLogout = useCallback(() => {
    setToken('');
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

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { login } from "@api/auth/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [_user, setUser] = useState({});
  const [_token, setToken] = useState(sessionStorage.getItem("toca-token"));

  useEffect(() => {
    console.log(_token);
    sessionStorage.setItem("toca-token", _token);
  }, [_token]);

  function handleLogin(email, password) {
    return new Promise((_, reject) => {
      login(email, password)
        .then(({ data: user }) => {
          console.log(user);
          setToken(user.token);
          location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          reject(error.response.data);
        });
    });
  }

  const handleLogout = useCallback(() => {
    setToken(null);
    location.href = "/login";
  });

  const value = useMemo(
    () => ({
      token: _token,
      setToken: setToken,
      user: _user,
      login: handleLogin,
      logout: handleLogout,
    }),
    [_token, _user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

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
  const [_token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("motonreel-token"))
  );

  const eventSource = React.useMemo(() => {
    if (_user.id && !_user.isAdmin) {
      const es = new EventSource(import.meta.env.VITE_API_URL + "/events");

      es.onmessage = function (event) {
        alertInfo("ANNONCE DE LA PLATEFORME : " + event.data);
      };

      return es;
    }
  }, [_user.id]);

  useEffect(() => {
    sessionStorage.setItem("motonreel-token", JSON.stringify(_token));
  }, [_token]);

  function handleLogin(email, password) {
    return new Promise((_, reject) => {
      login(email, password)
        .then(({ data: user }) => {
          setToken("Bearer " + user.token);
          location.href = "/";
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }

  const handleLogout = useCallback(() => {
    setToken(null);
    if (eventSource) eventSource.close();
    location.href = "/login";
  }, [eventSource]);

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
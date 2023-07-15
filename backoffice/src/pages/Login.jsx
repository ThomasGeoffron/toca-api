import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

import { useAuth } from '../hooks/auth';

export default function Login() {
  const { login, token } = useAuth();

  const [_email, setEmail] = useState('');
  const [_password, setPassword] = useState('');
  const [_error, setError] = useState();

  useEffect(() => {
    setError(null);
  }, [_password, _email]);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    if (!(_email && _password)) return;

    login(_email, _password).catch((error) => {
      setError(error);
    });
  }

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-row justify-center mt-20 p-10">
      <div className="flex items-center max-w-md w-1/2 py-4  rounded-lg">
        <div className="flex flex-col w-full items-center">
          <p className="text-red-600 font-bold mb-10">{_error}</p>
          <form onSubmit={handleLogin} className="flex flex-col w-full items-center mb-2">
            <div className="mb-6">
              <span className="block mb-2 text-sm font-medium text-left">
                Email :
              </span>
              <input
                type="email"
                id="email"
                value={_email}
                onChange={handleEmailChange}
                className="bg-gray-50 border border-gray-30 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="johndoe@example.com"
              />
            </div>
            <div className="mb-6">
              <span className="block mb-2 text-sm font-medium text-left">
                Mot de passe :
              </span>
              <input
                type="password"
                id="password"
                value={_password}
                onChange={handlePasswordChange}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="●●●●●●●●●●"
              />
            </div>
            <Button type="submit" color="dark" className="hover:bg-gray-800">
              Se connecter
            </Button>
          </form>
          <Link to="/register" className="text-md underline">
            <small>Créer un compte</small>
          </Link>
        </div>
      </div>
    </div>
  );
}

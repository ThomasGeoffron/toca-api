import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  Alert, Button, Card, Label, TextInput,
} from 'flowbite-react';

import { register } from '../api/auth/auth';
import { useAuth } from '../hooks/auth';

export default function Register() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [_company, setCompany] = useState('');
  const [_kbis, setKbis] = useState('');
  const [_email, setEmail] = useState('');
  const [_url, setUrl] = useState('');
  const [_password, setPassword] = useState('');
  const [_confirmPassword, setConfirmPassword] = useState('');

  const [_error, setError] = useState();

  useEffect(() => {
    setError(null);
  }, [_company, _email, _password, _confirmPassword]);

  function handleRegister(event) {
    event.preventDefault();
    if (_password !== _confirmPassword) {
      return;
    }
    register(_company, _kbis, _email, _password, _url)
      .then(() => navigate('/login'))
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center w-full py-4 rounded-lg">
      {_error && (
      <Alert color="failure" className="mb-5">
        <p>{_error}</p>
      </Alert>
      )}
      <Card className="max-w-md w-full">
        <h5 className="text-lg">Créer un compte</h5>
        <form onSubmit={handleRegister} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="text-start mb-2 block">
              <Label value="Nom de l'entreprise" />
            </div>
            <TextInput type="text" required value={_company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="KBIS" />
            </div>
            <TextInput type="text" required value={_kbis} onChange={(e) => setKbis(e.target.value)} />
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="URL du site" />
            </div>
            <TextInput type="text" required value={_url} onChange={(e) => setUrl(e.target.value)} />
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="E-mail" />
            </div>
            <TextInput type="email" required value={_email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="Mot de passe" />
            </div>
            <TextInput type="password" required value={_password} onChange={(e) => setPassword(e.target.value)} placeholder="●●●●●●●●●●" />
          </div>

          <div className="max-w-md">
            <div className="text-start mb-2 block">
              <Label value="Confirmation du mot de passe" />
            </div>
            <TextInput
              type="password"
              required
              value={_confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="●●●●●●●●●●"
            />
          </div>

          <Button type="submit" color="dark">
            Enregistrer
          </Button>
        </form>
        <Link to="/login" className="text-md underline">
          <small>J&apos;ai déjà un compte</small>
        </Link>
      </Card>
    </div>
  );
}


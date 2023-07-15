import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };

  const jwt = JSON.parse(sessionStorage.getItem('toca-token'));
  if (jwt) {
    headers.Authorization = `Bearer ${jwt.token}`;
  }

  return headers;
}

export function _get(path) {
  const headers = getHeaders();
  return axios.get(URL + path, { headers });
}

export function _post(path, body) {
  const headers = getHeaders();
  return axios.post(URL + path, body, { headers });
}

export function _patch(path, body) {
  const headers = getHeaders();
  return axios.patch(URL + path, body, { headers });
}

export function _delete(path) {
  const headers = getHeaders();
  return axios.delete(URL + path, { headers });
}

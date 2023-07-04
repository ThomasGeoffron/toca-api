import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function get_headers() {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = sessionStorage.getItem("toca-token");
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  return headers;
}

export function _get(path) {
  const headers = get_headers();
  return axios.get(URL + path, { headers });
}

export function _post(path, body) {
  const headers = get_headers();
  return axios.post(URL + path, body, { headers });
}

export function _patch(path, body) {
  const headers = get_headers();
  return axios.patch(URL + path, body, { headers });
}

export function _delete(path) {
  const headers = get_headers();
  return axios.delete(URL + path, { headers });
}

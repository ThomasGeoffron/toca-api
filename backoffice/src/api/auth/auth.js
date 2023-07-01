import { _get, _post } from "../gateway";

export function register(company, kbis, email, password, url) {
  const data = { company, kbis, email, password, url };
  return _post("/register", data);
}

export function login(email, password) {
  const data = { email, password };
  return _post("/login", data);
}

export function loginViaSecret(appId, appSecret) {
  const data = { appId, appSecret };
  return _post("/loginViaSecret", data);
}
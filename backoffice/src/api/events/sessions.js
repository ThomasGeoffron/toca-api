import { _get } from '../gateway';

export function findAllSessions() {
  return _get('/events/user-sessions');
}

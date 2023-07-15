import { _get } from '../gateway';

export function findAllPageViews() {
  return _get('/events/page-views');
}

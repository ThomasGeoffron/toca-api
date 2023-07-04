import { _get } from "../gateway";

export function findAll() {
  return _get(`/events/tracking`);
}

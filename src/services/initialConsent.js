import {storage} from './storage';

export const initialConsent = (() => {
  if (storage.get('consent') === undefined) return null;
  return true;
})();
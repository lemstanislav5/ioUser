import { storage } from './storage';

export const initialIntroduce = (() => {
  if (storage.get('introduce') === undefined) return false;
    return storage.get('introduce');
})();
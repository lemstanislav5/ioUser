import { options } from '../options';
import { storage } from './storage';

export const initialIntroduce = (() => {
  let introduce = storage.get('introduce');
  if (introduce === undefined) return false;
    return true;
})();
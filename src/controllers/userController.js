import { storage } from '../services/storage';
export const userController = {
  get: () => {
    if (storage.get('user') === null || storage.get('user') === undefined) {
      return false;
    } else {
      return storage.get('user');
    }
  },
  set: (name, email) => storage.set('user', {name, email}),
};

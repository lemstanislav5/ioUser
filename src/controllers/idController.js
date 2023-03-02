import { storage } from '../services/storage';

export const idController = {
  get: () => (storage.get('chatId')),
  set: (id) => {
    storage.set('chatId', id);
    return id;
  }
};

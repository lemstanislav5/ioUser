import { nanoid } from 'nanoid';
import { storage } from './storage';
export const chatId = (() => {
  if (storage.get('chatId') === null || storage.get('chatId') === undefined) {
    let id = nanoid(10);
    storage.set('chatId', id);
    return id;
  } else {
    return storage.get('chatId')
  }
})();
export const newId = num => (nanoid(num));

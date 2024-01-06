import {nanoid} from 'nanoid';
import {storage} from './storage';

const controllerChatId = {
  get: () => (storage.get('chatId')),
  set: (id) => {
    storage.set('chatId', id);
    return id;
  }
};
export const chatId = (controllerChatId.get() === null || controllerChatId.get() === undefined) ? controllerChatId.set(nanoid(10)) : controllerChatId.get();

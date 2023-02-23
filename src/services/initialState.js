import { options } from '../options';
import { storage } from './storage';
const testInitialState = [
  { id: 'JHLJSHSLKJ', chatId: 'initialState', type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '14-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: false, botAccepted: false},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '15-10-2021,9:19', serverAccepted: false, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'Hello!', date: '16-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '17-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '18-10-2021,9:19', serverAccepted: false, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'Hello!', date: '19-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '20-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'Hello!', date: '21-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '22-10-2021,9:19', serverAccepted: false, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'Hello!', date: '23-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '24-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'Hello!', date: '25-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '26-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'Hello!', date: '27-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '28-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'Hello!', date: '29-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHSLKJ', chatId: 'initialState',type: 'to', text: 'LAST MESSAGE', date: '30-10-2021,9:19', serverAccepted: true, botAccepted: false},
];

export const initialState = (() => {
  if (options.testData === false) {
    storage.clear();
    return [];
  }
  return (storage.get('messeges') === undefined || storage.get('messeges') !== [])
    ? testInitialState
    : storage.get('messeges');
})();

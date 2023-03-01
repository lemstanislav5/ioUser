import { options } from '../options';
import { storage } from './storage';
const testMesseges = [
  { id: 'JHLJSHS121', chatId: 'initialState', type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS111', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '14-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS222', chatId: 'initialState',type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: false, botAccepted: false},
  { id: 'JHLJSHSL33', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '15-10-2021,9:19', serverAccepted: false, botAccepted: true},
  { id: 'JHLJSHS333', chatId: 'initialState',type: 'to', text: 'Hello!', date: '16-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS444', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '17-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHS555', chatId: 'initialState',type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS666', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '18-10-2021,9:19', serverAccepted: false, botAccepted: true},
  { id: 'JHLJSHS777', chatId: 'initialState',type: 'to', text: 'Hello!', date: '19-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHS888', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '20-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHS999', chatId: 'initialState',type: 'to', text: 'Hello!', date: '21-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS000', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '22-10-2021,9:19', serverAccepted: false, botAccepted: true},
  { id: 'JHLJSHS009', chatId: 'initialState',type: 'to', text: 'Hello!', date: '23-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS233', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '24-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS878', chatId: 'initialState',type: 'to', text: 'Hello!', date: '25-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS888', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '26-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHS565', chatId: 'initialState',type: 'to', text: 'Hello!', date: '27-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS459', chatId: 'initialState',type: 'from', text: 'Hey! How can I help you?', date: '28-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS021', chatId: 'initialState',type: 'to', text: 'Hello!', date: '29-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS725', chatId: 'initialState',type: 'to', text: 'LAST MESSAGE', date: '30-10-2021,9:19', serverAccepted: true, botAccepted: false},
];

export const initialMesseges = (() => {
  let ms = storage.get('messeges');
  let testMode = () => {
    if (ms !== undefined && ms[0] !== undefined && ms[0].id === 'JHLJSHS121') return true;
    return false
  }

  if (options.testData && testMode()) {
    return ms;
  } else if(options.testData && !testMode()) {
    storage.clear()
    return testMesseges;
  } else if(!options.testData && testMode()) {
    storage.clear();
    return [];
  } else if(!options.testData && !testMode()) {
    return ms === undefined? [] : ms;
  }
})();

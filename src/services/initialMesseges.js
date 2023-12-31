import { testData } from '../setings';
import { storage } from './storage';
const testMesseges = [
  { id: 'JHLJSHS121', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS111', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hey! How can I help you?', date: '14-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS222', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: false, botAccepted: false},
  { id: 'JHLJSHSL33', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hey! How can I help you?', date: '15-10-2021,9:19', serverAccepted: false, botAccepted: true},
  { id: 'JHLJSHS333', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '16-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS444', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hey! How can I help you?', date: '17-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHS555', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS666', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hey! How can I help you?', date: '18-10-2021,9:19', serverAccepted: false, botAccepted: true},
  { id: 'JHLJSHS777', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '19-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHS888', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hey! How can I help you?', date: '20-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHS999', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '21-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS000', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hey! How can I help you?', date: '22-10-2021,9:19', serverAccepted: false, botAccepted: true},
  { id: 'JHLJSHS009', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '23-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS233', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hey! How can I help you?', date: '24-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS878', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '25-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS888', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hey! How can I help you?', date: '26-10-2021,9:19', serverAccepted: true, botAccepted: false},
  { id: 'JHLJSHS565', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '27-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS459', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hey! How can I help you?', date: '28-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS021', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'Hello!', date: '29-10-2021,9:19', serverAccepted: true, botAccepted: true},
  { id: 'JHLJSHS725', from: 'JHLJSHS121', to: 'admin', type: 'text', text: 'LAST MESSAGE', date: '30-10-2021,9:19', serverAccepted: true, botAccepted: false},
];

export const initialMesseges = (() => {
  let ms = storage.get('messeges');
  let testMode = () => {
    if (ms !== undefined && ms[0] !== undefined && ms[0].id === 'JHLJSHS121') return true;
    return false
  }

  if (testData && testMode()) {
    return ms;
  } else if(testData && !testMode()) {
    storage.clear()
    return testMesseges;
  } else if(!testData && testMode()) {
    storage.clear();
    return [];
  } else if(!testData && !testMode()) {
    return ms === undefined? [] : ms;
  }
})();

const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_STATUS_MESSAGE = 'UPDATE_STATUS_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';
const СONNECTION = 'СONNECTION';

export const initialState = {
  connected: false,
  messages: [
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '14-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: false, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '15-10-2021,9:19', serverAccepted: false, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '16-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '17-10-2021,9:19', serverAccepted: true, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '18-10-2021,9:19', serverAccepted: false, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '19-10-2021,9:19', serverAccepted: true, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '20-10-2021,9:19', serverAccepted: true, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '21-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '22-10-2021,9:19', serverAccepted: false, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '23-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '24-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '25-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '26-10-2021,9:19', serverAccepted: true, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '27-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '28-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '29-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'LAST MESSAGE', date: '30-10-2021,9:19', serverAccepted: true, botAccepted: false},
  ],
};

export const actionCreatorСonnection = (result) => ({ type: СONNECTION, result });
export const actionCreatorAddmessage = (data) => ({ type: ADD_MESSAGE, data });
export const actionCreatorUpdateStatusMessage = (data) => ({ type: UPDATE_STATUS_MESSAGE, data });
export const actionCreatorGetMessages = (arr) => ({ type: GET_MESSAGES, arr });

export const chat_reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const result = state.messages.find(item => {return (item.id === action.data.id) ? true : false});
      if(!result) {
        return { ...state, messages: [ ...state.messages, action.data ]};
      } else {
        return state;
      }
    }
    case UPDATE_STATUS_MESSAGE: {
      return {
        ...state,
        messages: [ ...state.messages.map(item => {
          if(item.id === action.data.id) {
            return { id: item.id, type: item.type, text: item.text, date: item.date, serverAccepted: true, botAccepted: true};
          } else {
            return item;
          }
        })]
      };
    }
    case GET_MESSAGES: {
      return { ...state, messages: action.arr };
    }
    case СONNECTION: {
      return {
        ...state,
        connected: action.result,
      };
    }
    default: {
      return state;
    }
  }
};

export const setMessageStorageThunk = (message) => (dispath) => {
  let messages = []
  if(localStorage.getItem('MESSAGES') === null) {
    messages = JSON.stringify([...messages, message]);
  } else {
    messages = JSON.stringify([...JSON.parse(localStorage.getItem('MESSAGES')), message]);
  }
  console.log(messages, typeof(messages))
  localStorage.setItem('MESSAGES', messages)
  dispath(actionCreatorAddmessage(message));
}
export const updateStatusMessageStorageThunk = (message) => (dispath) => {
  //!if(localStorage.getItem('MESSAGES') === null)
  let messages = JSON.parse(localStorage.getItem('MESSAGES')).map(item => {
    if(item.id === message.id) {
      item.serverAccepted = message.serverAccepted; 
      item.botAccepted = message.botAccepted;
    }
    return item;
  });
  localStorage.setItem('MESSAGES', JSON.stringify(messages));
  dispath(actionCreatorUpdateStatusMessage(message));
}
export const getMessagesStorageThunk = () => (dispath) => {
  //!if(localStorage.getItem('MESSAGES') === null)
  const messages = JSON.parse(localStorage.getItem('MESSAGES'));
  if(messages !== null) {
    messages.forEach(element => {
      dispath(actionCreatorAddmessage(element));
    });
  }
}
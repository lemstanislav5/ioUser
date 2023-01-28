import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { chat_reducer } from './chat_reducer';


const rootReducer = combineReducers({
  chat: chat_reducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
window.store = store;
export default store;

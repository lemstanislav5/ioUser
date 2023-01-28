// import { createSelector } from "reselect";

export const getConnectedSelector = (state) => {
  return state.chat.connected;
};
export const getMessagesSelector = (state) => {
  return state.chat.messages;
};
// export const getMessages = createSelector(
//   getMessagesSelector, (messages) => {
//     return messages;
//   });
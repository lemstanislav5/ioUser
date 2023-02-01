export const getConnectedSelector = (state) => {
  return state.chat.connected;
};
export const getMessagesSelector = (state) => {
  return state.chat.messages;
};

export const getChatIdSelector = (state) => {
  return state.chat.chat_id;
};
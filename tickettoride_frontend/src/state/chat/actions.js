export const ADD_MESSAGE = "ADD_MESSAGE";
export const REPLACE_CHAT = "REPLACE_CHAT";
export const INIT_CHAT = "INIT_CHAT";

export const addMessage = (sender,message) => ({
  type: ADD_MESSAGE,
  payload: {sender,message}
})

export const replaceChat = (chat) => ({
  type: REPLACE_CHAT,
  payload: chat
})

export const initChat = () => ({
  type: INIT_CHAT
})
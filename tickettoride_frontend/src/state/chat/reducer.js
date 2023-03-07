import { ADD_MESSAGE, INIT_CHAT, REPLACE_CHAT } from "./actions";

const initialState = [];

export const chatReducer = (state = initialState,action) => {
  const {type, payload} = action;
  const chat = state;

  if(type === ADD_MESSAGE){
    return [...state,{sender: payload.sender, message: payload.message}]
  }

  if(type === REPLACE_CHAT){
    return [...payload];
  }

  if(type === INIT_CHAT){
    return [];
  }

  return state;
}
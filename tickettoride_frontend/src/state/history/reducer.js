import { ADD_HISTORY, INITIALIZE_HISTORY, REPLACE_HISTORY } from "./actions";

const initialState = [];

export const historyReducer = (state = initialState, action) => {
  const {type,payload} = action;

  if(type === ADD_HISTORY){
    return [payload,...state,];
  }

  if(type === REPLACE_HISTORY){
    return [...payload];
  }

  if(type === INITIALIZE_HISTORY){
    return []
  }

  return state;
}
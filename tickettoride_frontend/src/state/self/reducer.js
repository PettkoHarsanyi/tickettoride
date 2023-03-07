import { NULL_SELF, SET_SELF } from "./actions";

let initialState = null;

export const selfReducer = (state = initialState,action) => {
  const {type, payload} = action;

  if(type === SET_SELF){
    return payload;
  }

  if(type === NULL_SELF){
    return null;
  }

  return state;
}

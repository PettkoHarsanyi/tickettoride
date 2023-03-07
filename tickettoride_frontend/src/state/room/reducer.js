import { INITIALIZE_ROOM, NULL, SET_ROOMID, SET_ROOMSIZE } from "./actions";

let initialState = {
  size: null,
  roomId: null,
};

export const roomReducer = (state = initialState,action) => {
  const {type, payload} = action;

  if(type === SET_ROOMID){
    return {
      ...state,
      roomId: payload
    };
  }

  if(type === NULL){
    return {
      size: null,
      roomId: null,
    };
  }

  if(type === SET_ROOMSIZE){
    return {
      ...state,
      size: payload,
    }
  }

  if(type === INITIALIZE_ROOM){
    return {
      ...state,
      roomId: null,
      size:null,
    }
  }

  return {
    ...state
  };
}

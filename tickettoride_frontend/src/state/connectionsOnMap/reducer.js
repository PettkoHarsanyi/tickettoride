import { ADD_CONNECTION, INITIALIZE_CONNECTIONS, REPLACE_CONNECTIONS } from "./actions";

export const connectionsOnMapReducer = (state = [], action) => {
  const {type, payload} = action;
  const connectionsOnMap = state;

  if(type === ADD_CONNECTION){
    return [...state, payload];
  }

  if(type === REPLACE_CONNECTIONS){
    return [...payload];
  }

  if(type === INITIALIZE_CONNECTIONS){
    return [];
  }

  return state;
}
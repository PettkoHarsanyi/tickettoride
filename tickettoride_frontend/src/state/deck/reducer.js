import { ADD_CARD_TO_DECK, INITIALIZE_DECK, REPLACE_DECK } from "./actions";

const initialState = [{id: null, color: ""},{id: null,color: ""},{id: null,color: ""},{id: null,color: ""},{id: null,color: ""}]

export const deckReducer = (state = initialState, action) => {
  const {type, payload} = action;

  if(type===ADD_CARD_TO_DECK){
    const pos = payload.pos;
      state[pos] = payload.train;
      return [...state] 
  }

  if(type === REPLACE_DECK){
    return [...payload];
  }

  if(type === INITIALIZE_DECK){
    return [{id: null, color: ""},{id: null,color: ""},{id: null,color: ""},{id: null,color: ""},{id: null,color: ""}]
  }

  return state;
}
import { INITIALIZE_TRAINS, REMOVE_TRAIN, REPLACE_TRAINS } from "./actions";
import { trainDeck } from "../../assets/trainDeck.js";

const initialState = trainDeck;

export const trainsReducer = (state = initialState,action) => { 
  const {type, payload} = action;
  const trains = state;
  
  if(type=== REMOVE_TRAIN){
    return trains.filter(train => train.id !== payload.id);
  }

  if(type === REPLACE_TRAINS){
    return [...payload];
  }

  if(type === INITIALIZE_TRAINS){
    return [...trainDeck];
  }

  return state;
};
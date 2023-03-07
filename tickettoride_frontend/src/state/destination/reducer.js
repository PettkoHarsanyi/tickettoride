import { ADD_DEST, INITIALIZE_DESTS, REMOVE_DEST, REPLACE_DEST } from "./actions";
import { ticketToRideData } from "../../assets/ticket-to-ride-data.js";

const initialState = Object.values(ticketToRideData.destinations);

export const destinationsReducer = (state = initialState,action) => {
  const {type, payload} = action;
  const destinations = state;

  if(type=== ADD_DEST){
    return [...destinations,payload]    
  }

  if (type === REMOVE_DEST){
    return destinations.filter(dest => dest.id !== payload.id)
  }

  if(type === REPLACE_DEST){
    return [...payload];
  }

  if(type === INITIALIZE_DESTS){
    return [...Object.values(ticketToRideData.destinations)]
  }

  return state;
};
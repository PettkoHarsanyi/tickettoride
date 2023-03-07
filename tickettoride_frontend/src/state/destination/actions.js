import { ticketToRideData } from "../../assets/ticket-to-ride-data";

export const ADD_DEST = "ADD_DEST"
export const REMOVE_DEST = "REMOVE_DEST"
export const REPLACE_DEST = "REPLACE_DEST"
export const INITIALIZE_DESTS = "INITIALIZE_DESTS"

const destinations = Object.values(ticketToRideData.destinations);

const getRandDest = () => {return(Math.floor(Math.random() * destinations.length))};
// const destination = useState();


export const addDestination = () => ({
  type: ADD_DEST,
  payload: {id: destinations[getRandDest()].id, fromCity: destinations[getRandDest()].fromCity, toCity: destinations[getRandDest()].toCity}
})

export const removeDest = (dest) => ({
  type: REMOVE_DEST,
  payload: dest
})

export const replaceDest = (dests) => ({
  type: REPLACE_DEST,
  payload: dests,
})

export const initializeDests = () => ({
  type: INITIALIZE_DESTS,
})
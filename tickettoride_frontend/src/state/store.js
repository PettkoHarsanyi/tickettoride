import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { destinationsReducer } from "./destination/reducer";
import { trainsReducer } from "./train/reducer";
import { playersReducer } from "./players/reducer";
import { historyReducer } from "./history/reducer";
import { deckReducer } from "./deck/reducer";
import thunk from 'redux-thunk';
import { roomReducer } from "./room/reducer";
import { selfReducer } from "./self/reducer";
import { sync } from "./sync";
import { connectionsOnMapReducer } from "./connectionsOnMap/reducer";
import { chatReducer } from "./chat/reducer";


const rootReducer = combineReducers({
  trains: trainsReducer,
  destinations: destinationsReducer,
  players: playersReducer,
  history: historyReducer,
  deck: deckReducer,
  room: roomReducer,
  self: selfReducer,
  connectionsOnMap: connectionsOnMapReducer,
  chat: chatReducer
});

const logger = createLogger({
  collapsed: true,
});



export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger, sync)));
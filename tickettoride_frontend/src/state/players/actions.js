import io from "socket.io-client";

export const ADD_PLAYER = "ADD_PLAYER"
export const REMOVE_PLAYER = "REMOVE_PLAYER"
export const SET_ACTUAL = "SET_ACTUAL"
export const ADD_TRAINCARD = "ADD_TRAINCARD"
export const ADD_DESTCARD = "ADD_DESTCARD"
export const SET_SCORE = "SET_SCORE"
export const REDUCE_WAGONS = "REDUCE_WAGONS"
export const REMOVE_TRAIN_FROM_PLAYER = "REMOVE_TRAIN_FROM_PLAYER";
export const REPLACE_PLAYERS = "REPLACE_PLAYERS";
export const INITIALIZE_PLAYERS = "INITIALIZE_PLAYERS";



export const addPlayer = (player,id,color) => ({
  type: ADD_PLAYER,
  payload: {id: id, name: player, actual: false, trains: [], destinations: [], cars: 45, points: 0, color: color}
})

export const setPlayerScore = (player,score) => ({
  type: SET_SCORE,
  payload: {player,score},
})

export const reduceWagons = (player,number) => ({
  type: REDUCE_WAGONS,
  payload: {player,number}
})

export const removePlayer = (player) => ({
  type: REMOVE_PLAYER,
  payload: player,
})

export const setPlayerActual = (player) => ({
  type: SET_ACTUAL,
  payload: player,
})

export const addTrainToPlayer = (player, trainCard) => ({
  type: ADD_TRAINCARD,
  payload: {player,trainCard}
})

export const removeTrainFromPlayer = (player, train) => ({
  type: REMOVE_TRAIN_FROM_PLAYER,
  payload: {player,train}
})

export const addDestToPlayer = (player, destCard) => ({
  type: ADD_DESTCARD,
  payload: {player,destCard}
})

export const replacePlayers = (players) => ({
  type: REPLACE_PLAYERS,
  payload: players,
})

export const initializePlayers = () => ({
  type: INITIALIZE_PLAYERS,
})
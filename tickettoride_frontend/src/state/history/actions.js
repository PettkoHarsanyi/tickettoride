export const ADD_HISTORY = "ADD_HISTORY"
export const REPLACE_HISTORY = "REPLACE_HISTORY"
export const INITIALIZE_HISTORY = "INITIALIZE_HISTORY"


export const addHistory = (player,message) => ({
  type: ADD_HISTORY,
  payload: {name:player, message: message},
})

export const replaceHistory = (history) => ({
  type: REPLACE_HISTORY,
  payload: history,
})

export const initializeHistory = () => ({
  type: INITIALIZE_HISTORY,
})
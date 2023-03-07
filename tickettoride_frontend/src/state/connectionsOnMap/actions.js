export const ADD_CONNECTION = "ADD_CONNECTION"
export const REPLACE_CONNECTIONS = "REPLACE_CONNECTIONS"
export const INITIALIZE_CONNECTIONS = "INITIALIZE_CONNECTIONS"

export const addConection = (connection) => ({
  type: ADD_CONNECTION,
  payload: connection
})

export const replaceConnections = (connections) => ({
  type: REPLACE_CONNECTIONS,
  payload: connections
})

export const initialilizeConnections = () => ({
  type: INITIALIZE_CONNECTIONS,
})
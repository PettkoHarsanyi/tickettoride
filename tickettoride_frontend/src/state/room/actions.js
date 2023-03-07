export const SET_ROOMID = "SET_ROOMID"
export const NULL = "NULL"
export const SET_ROOMSIZE = "SET_ROOMSIZE"
export const INITIALIZE_ROOM = "INITIALIZE_ROOM"


export const setRoomId = (roomId) => ({
  type: SET_ROOMID,
  payload: roomId
})

export const setRoomSize = (size) => ({
  type: SET_ROOMSIZE,
  payload: size,
})

export const nullRoomId = () => ({
  type: NULL,
})

export const initializeRoom = () => ({
  type: INITIALIZE_ROOM
})
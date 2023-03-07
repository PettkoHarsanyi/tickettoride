export const SET_SELF = "SET_SELF"
export const NULL_SELF = "NULL_SELF"

export const setSelf = (name) => ({
  type: SET_SELF,
  payload: name
})

export const nullSelf = () => ({
  type: NULL_SELF,
})
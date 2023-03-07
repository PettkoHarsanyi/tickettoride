export const REMOVE_TRAIN = "REMOVE_TRAIN";
export const REPLACE_TRAINS = "REPLACE_TRAINS";
export const INITIALIZE_TRAINS = "INITIALIZE_TRAINS";


export const removeTrain = (train) => ({
  type: REMOVE_TRAIN,
  payload: train
})

export const replaceTrain = (trains) => ({
  type: REPLACE_TRAINS,
  payload: trains
})

export const initializeTrains = () => ({
  type: INITIALIZE_TRAINS
})
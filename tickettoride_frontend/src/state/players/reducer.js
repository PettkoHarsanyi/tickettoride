import { ADD_DESTCARD, ADD_PLAYER, ADD_TRAINCARD, INITIALIZE_PLAYERS, REDUCE_WAGONS, REMOVE_PLAYER, REMOVE_TRAIN_FROM_PLAYER, REPLACE_PLAYERS, SET_ACTUAL, SET_SCORE } from "./actions";

const initialState = {
  players: [],
}

export const playersReducer = (state = initialState,action) => {
  const {type, payload} = action;

  if(type === SET_SCORE){
    const currentPlayers = state.players;
    const score = payload.score;
    const actualPlayer = payload.player;

    return{
      ...state,
      players: currentPlayers.map((player)=>{
        if(player.id === actualPlayer.id){
          actualPlayer.points = actualPlayer.points + score;
          return actualPlayer;
        }else{
          return player;
        }
      })
    }
  }

  if(type=== ADD_PLAYER){
    const currentPlayers = state.players;
    const actualPlayer = payload;

    return {
      ...state,
      players: [...currentPlayers, {...actualPlayer, id: state.players.length+1, color: "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),}]
    }
  }

  if(type === REDUCE_WAGONS){
    const currentPlayers = state.players;
    const number = payload.number;
    const actualPlayer = payload.player;

    return{
      ...state,
      players: currentPlayers.map((player)=>{
        if(player.id === actualPlayer.id){
          actualPlayer.cars = actualPlayer.cars - number;
          return actualPlayer;
        }else{
          return player;
        }
      })
    }
  }

  if(type === REMOVE_TRAIN_FROM_PLAYER){
    const currentPlayers = state.players;
    const actualTrain = payload.train;
    const actualPlayer = payload.player;

    actualPlayer.trains = actualPlayer.trains.filter(train => train.id !== actualTrain.id)

    return{
      ...state,
      players: currentPlayers.map((player)=>{
        if(player.id === actualPlayer.id){
          return actualPlayer;
        }else{
          return player;
        }
      })
    }
  }

  if(type === SET_ACTUAL){
    const currentPlayers = state.players;
    const actualPlayer = payload;

    actualPlayer.actual = true;

    return{
      ...state,
      players: currentPlayers.map((player) => {
        if(player.id === actualPlayer.id){
          return actualPlayer;
        }else{
          player.actual = false;
          return player;
        }
      })
    }
  }

  if(type === ADD_TRAINCARD){
    const currentPlayers = state.players;
    const actualPlayer = payload.player;
    const trainCard = payload.trainCard;

    actualPlayer.trains = [...actualPlayer.trains, trainCard]

    return{
      ...state,
      players: currentPlayers.map((player) => (player.id === actualPlayer.id) ? actualPlayer : player)
    }
  }

  if(type === ADD_DESTCARD){
    const currentPlayers = state.players;
    const actualPlayer = payload.player;
    const destCard = payload.destCard;

    actualPlayer.destinations = [...actualPlayer.destinations, destCard]

    return{
      ...state,
      players: currentPlayers.map((player) => (player.id === actualPlayer.id) ? actualPlayer : player)
    }
  }

  if(type===REMOVE_PLAYER){
    const actualPlayer = payload;
    const currentPlayers = state.players;

    return{
      ...state,
      players: currentPlayers.filter(player => player.id !== actualPlayer.id)
    }
  }

  if(type === REPLACE_PLAYERS){
    return {
      ...state,
      players: payload,
    }
  }

  if(type === INITIALIZE_PLAYERS){
    return {
      ...state,
      players: [],
    }
  }

  return state;
};
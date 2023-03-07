import { socket } from "../views/socket"
import { ADD_MESSAGE } from "./chat/actions";
import { ADD_CONNECTION } from "./connectionsOnMap/actions";
import { ADD_HISTORY } from "./history/actions";
import { ADD_PLAYER, SET_ACTUAL } from "./players/actions";
import { REMOVE_TRAIN } from "./train/actions";

export const sync = (store) => (next) => (action) => {
  let isSync = false;

  const types = [
    REMOVE_TRAIN,
    SET_ACTUAL,
    ADD_HISTORY,
    ADD_CONNECTION,
    ADD_MESSAGE
  ];

  if (types.includes(action.type)) {
    if (
      store
        .getState()
        .players.players.some(
          (player) => player.name === store.getState().self && player.actual
        )
    ) {
      isSync = true;
    }
  }

  next(action);

  if (isSync) {
    // let state = {
    //   ...store.getState().game,
    //   board: { ...store.getState().game.board, handChosen: [] },
    // };

    let state = store.getState();

    socket.emit(
      "sync-action",
      store.getState().room.roomId,
      {type: "GAME_CHANGED", state: state},
      true,
      (ack) => {}
    );
  }
};

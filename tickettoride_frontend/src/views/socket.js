import {io} from "socket.io-client";
import { initChat, replaceChat } from "../state/chat/actions";
import { addConection, initialilizeConnections, replaceConnections } from "../state/connectionsOnMap/actions";
import { initializeDeck, replaceDeck } from "../state/deck/actions";
import { initializeDests } from "../state/destination/actions";
import { initializeHistory, replaceHistory } from "../state/history/actions";
import { addPlayer, initializePlayers, replacePlayers } from "../state/players/actions";
import { initializeRoom, setRoomId, setRoomSize, setRound } from "../state/room/actions";
import { setSelf } from "../state/self/actions";
import { store } from "../state/store";
import { initializeTrains, replaceTrain } from "../state/train/actions";

export let socket = io("http://localhost:3031");

socket.on("state-changed",()=>{
  socket.emit("get-state",store.getState().room.roomId,(ack) => {
    if(store.getState().self === store.getState().players.players[0].name && ack){

      JSON.parse(ack.state).players.players.forEach(player => {
        store.dispatch(addPlayer(player.name,store.getState().players.players.length+1,player.color));
      });
    
      socket.emit("sync-action",store.getState().room.roomId,{type:"PLAYER_JOINED",state:store.getState()},true,()=>{})
    }
  });      
})

socket.on("action-sent",(ack)=>{
  if(ack.action.type === "GAME_CHANGED"){
    store.dispatch(replacePlayers(ack.action.state.players.players))
    store.dispatch(replaceDeck(ack.action.state.deck));
    store.dispatch(replaceTrain(ack.action.state.trains));
    store.dispatch(replaceHistory(ack.action.state.history));
    store.dispatch(replaceConnections(ack.action.state.connectionsOnMap));
  }

  if(ack.action.type === "PLAYER_JOINED"){
    store.dispatch(replacePlayers(ack.action.state.players.players))
    store.dispatch(setRoomId(ack.action.state.room.roomId));
    store.dispatch(setRoomSize(ack.action.state.room.size));
    store.dispatch(replaceDeck(ack.action.state.deck));
    store.dispatch(replaceChat(ack.action.state.chat));
  }

  if(ack.action.type === "MESSAGE_SENT"){
    store.dispatch(replaceChat(ack.action.state.chat));
  }

})

export const handleCreateRoom = (number) => {
  let roomId;
  socket.emit("create-room",number,(ack)=>{
    store.dispatch(setRoomId(ack.roomId));
    store.dispatch(setRoomSize(number));
  });
  
  socket.emit("sync-state",roomId,store.getState(),true,(ack)=>{});
};

export const joinRoom = (id) => {
  socket.emit("join-room",id,(ack) => {
    socket.emit("sync-state",id,store.getState(),true,(ack)=>{});
  });
}

export const startGame = () => {
  
}

export const leaveGame = () => {
  socket.emit("leave-room",store.getState().room.roomId,(ack)=>{})
  store.dispatch(initializeTrains());
  store.dispatch(initializeDests());
  store.dispatch(initializePlayers());
  store.dispatch(initializeHistory());
  store.dispatch(initializeDeck());
  store.dispatch(initializeRoom());
  store.dispatch(initialilizeConnections());
  store.dispatch(initChat());
}
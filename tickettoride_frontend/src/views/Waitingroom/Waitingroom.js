import { Link, useParams } from "react-router-dom";
import { Backbutton } from "../Backbutton/Backbutton";
import { Player } from "./Player";
import "../../css/Waitingroom.css";
import { addPlayer, wsConnect } from "../../state/players/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getPlayers } from "../../state/players/selectors";
import { Redirect } from "react-router-dom";
import { store } from "../../state/store";
import { leaveGame, socket, startGame } from "../socket";
import { addMessage } from "../../state/chat/actions";
import { getChat } from "../../state/chat/selectors"
import { Chat } from "../Chat";

function copy() {
  var copyText = document.getElementById("roomId");
  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");

  document.getElementById("copyButton").innerHTML = "Másolva";
  document.getElementById("copyButton").setAttribute("class", "copied")
}

export function handleSendChat(){
  let message = document.getElementById("message").value;
  if(message!==""){document.getElementById("message").value = "";
    store.dispatch(addMessage(store.getState().self,message));
    socket.emit("sync-action",store.getState().room.roomId,{type:"MESSAGE_SENT",state:store.getState()},true,()=>{})
  }
}


export function Waitingroom({ players }) {

  const dispatch = useDispatch();

  
  // const socket = io("ws://webprogramozas.inf.elte.hu:3031");

  // useEffect(()=>{
  //   dispatchPlayer(wsConnect());
  // });

  const playerNumber = useSelector(state => state.players.players.length)
  const room = useSelector(state => state.room);
  const messages = useSelector(getChat);

  useEffect(()=>{
    document.getElementById("message").addEventListener("keypress",({key})=>{
      if(key === "Enter"){
        handleSendChat();
      }
    })
  },[])
  
  useEffect(()=>{
    document.getElementById("texts").scrollTop = document.getElementById("texts").scrollHeight;
  },[messages])

  if(playerNumber === parseInt(room.size)){
    startGame();
    return <Redirect to="/game" />
    
  }


  return (
    <>
      <Backbutton />

      <div className="Waitingroom">
        <header className="Waitingroom-header">
          <div className="Waitingroom-panel">
            <div className="leftPanel">
              <div>Csatlakozott játékosok:</div>
              <div className="players">
                {players.map((player)=>{
                  return <Player key={player.id} player={player} />
                })}
              </div>
              <div className="roomCode">
                Szobakód:
                <br />
                <div>
                  <textarea id="roomId" readOnly className="roomId" value={room.roomId || "Nem található ilyen szoba!"} onClick={()=>copy()} style={{resize:"none"}}> </textarea>
                  <button id="copyButton" className="copyButton" onClick={()=>copy()}>Másolás</button>
                </div>
              </div>
            </div>
            <div className="rightPanel">

            <div style={{textAlign: "left"}} className="chatwr">
              <div style={{marginTop:"1vh"}}>Chat</div>
              <div id="texts" className="texts" style={{fontSize:"2vh", overflowY:"scroll", paddingTop: "2vh", marginTop: "1vh", borderTop:"0.5vh solid black"}}>
                {messages.map((message) => {
                  return <div key={message.message} style={{alignSelf: message.sender === store.getState().self ? "flex-end" : "flex-start", marginLeft: message.sender === store.getState().self ? "10vh" : "0.5vh", marginRight: message.sender !== store.getState().self ? "10vh" : "1vh", marginBottom:"0.5vh", border: "0.4vh solid black", padding: "0.5vh", borderRadius: "1vh", maxWidth: "70%", wordWrap: "break-word"}}>{message.sender}:<div style={{marginLeft: "2vh" }}>{message.message}</div></div>
                })}
              </div>
              <div>
                <input className="inputfield" type="text" id="message"></input>
                <button className="sendButton" onClick={handleSendChat}>Küld</button>
              </div>
            </div>

              <div className="buttons">
                <Link to={"/"} className="button1" onClick={leaveGame}>
                  Kilépés
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

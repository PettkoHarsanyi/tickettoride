import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPlayer } from "../../state/players/actions";
import { Backbutton } from "../Backbutton/Backbutton";
import "./Connectroom.css";
import { joinRoom } from "../socket"
import { setSelf } from "../../state/self/actions";

export function Connectroom({ setUserName }) {
  const [roomValue, setRoomValue] = useState("");
  const [nameState, setName] = useState("");
  let history = useHistory();

  const dispatch = useDispatch();

  function handleClick() {
    setUserName(nameState);
    if (nameState && roomValue) {
      history.push(`/waitingroom/${roomValue}`);
      dispatch(addPlayer(nameState,10,null));
      dispatch(setSelf(nameState));
      joinRoom(roomValue);
    }
  }

  return (
    <>
      <Backbutton />
      <div className="Connectroom">
        <header className="Connectroom-header">
          <form>
            <div className="Connectroom-panel">
              <div className="nameInput">
                <div>Játékosnév:</div>
                <input
                  value={nameState}
                  onChange={(text) => setName(text.target.value)}
                  placeholder="(pl: VoNatália)"
                  required
                />
              </div>
              <div className="roomInput">
                <input
                  value={roomValue}
                  onChange={(text) => setRoomValue(text.target.value)}
                  placeholder="Ide jön a szobakód... (TO BE ADDED)"
                  required
                />
                <button
                  to={`/waitingroom/${roomValue}`}
                  className="connect-button"
                  onClick={handleClick}
                >
                  Csatlakozás
                </button>
              </div>
            </div>
          </form>
        </header>
      </div>
    </>
  );
}

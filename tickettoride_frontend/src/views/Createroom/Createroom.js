import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Backbutton } from "../Backbutton/Backbutton";
import "../../css/Createroom.css";
import { addPlayer } from "../../state/players/actions";
import { useDispatch } from "react-redux";
import { handleCreateRoom } from "../socket"
import { setSelf } from "../../state/self/actions";

export function Createroom({ setPlayerNumber, setUserName }) {
  const [roomcode, setRoomcode] = useState(Date.now());
  const [slideState, setSlideState] = useState(2);
  const [inputState, setInputState] = useState("");
  let history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(slideState);
  };

  const handleUserName = (text) => {
    setUserName(inputState);
  };

  const handlePlayerNumber = (num) => {
    setPlayerNumber(slideState);
  };

  function handleClick() {
    
    if (inputState) {
      // if(slideState > 1){
        setRoomcode(Date.now());
        handlePlayerNumber();
        dispatch(addPlayer(inputState,1,"green"));
        dispatch(setSelf(inputState));
        history.push(`/waitingroom/`); // A látvány kedvéért kerülünk be egyedül is a váró szobába, később 1 játékos esetén rögtön a játék szobába kerülünk
        // }else{
          //   history.push(`/game`);
          // }
        handleCreateRoom(slideState);
    }

  }

  return (
    <>
      <Backbutton />
      <div className="Createroom">
        <header className="Createroom-header">
          <form className="Createroom-panel" onSubmit={handleSubmit}>
            <div className="title">Szoba létrehozása</div>
            <div className="playerNumber">
              <p>Játékosok száma:</p>
              <div>{slideState}</div>

              <input
                type="range"
                min="2"
                max="5"
                value={slideState}
                onChange={(text) => {
                  setSlideState(text.target.value)
                }}
                className="slider"
                id="myRange"
              />
            </div>
            <input
              value={inputState}
              onChange={(text) => setInputState(text.target.value)}
              className="input"
              placeholder="Név:"
              required
            />
            <button
              className="button"
              type="submit"
              onClick={() => {
                handleClick();
              }}
            >
              Létrehozás
            </button>
          </form>
        </header>
      </div>
    </>
  );
}

import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Game } from "./Game/Game";
import { Home } from "./Home/Home";
import { Rules } from "./Rules/Rules";
import { Waitingroom } from "./Waitingroom/Waitingroom";
import { Logo } from "./Logo/Logo";
import { Connectroom } from "./Connectroom/Connectroom";
import { Createroom } from "./Createroom/Createroom";
import { useEffect, useRef, useState } from "react";
import { addPlayer } from "../state/players/actions";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getPlayers } from "../state/players/selectors";
import { store } from "../state/store";


export function App() {
  const [userNameState, setUserName] = useState("unnamedWarrior");
  const [playerNumberState, setPlayerNumber] = useState(1);
  // const [players, setPlayers] = useState({});
  const [roomIdState, setRoomIdState] = useState(()=> {return "semmi"});
  const roomIdRef = useRef("semmi");
  const players = useSelector(getPlayers);
  let history = useHistory();
  const dispatch = useDispatch();
  const idRef = useRef(2);

  const handleUserName = (text) => {
    setUserName(text);
  };

  const handlePlayerNumber = (num) => {
    setPlayerNumber(num);
  };


  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/">
          <Logo/>

          <Home />
        </Route>
        <Route path={`/waitingroom`}>
          <Logo />
          <Waitingroom
            players = {players}
            // setPlayers={handlePlayers}
          />
        </Route>
        <Route path="/game">
          <Game/>
        </Route>
        <Route path="/rules">
          <Logo />
          <Rules />
        </Route>
        <Route path="/connectroom">
          <Logo />
          <Connectroom setUserName={handleUserName} 
          />
        </Route>
        <Route path="/createroom">
          <Logo />
          <Createroom
            setPlayerNumber={handlePlayerNumber}
            setUserName={handleUserName}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

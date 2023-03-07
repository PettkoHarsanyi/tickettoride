import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../css/Home.css";
import { addPlayer } from "../../state/players/actions";



export function Home() {

  const dispatchPlayer = useDispatch();



  const handleClick = () => {
    dispatchPlayer(addPlayer("Player1",1,"limegreen"));
    dispatchPlayer(addPlayer("Player2",2,"turquoise"));
    // dispatchPlayer(addPlayer("Player3",3,"red"));
  }

  function chartConfig(){

  }

  return (
    <div className="Home">
      <header className="Home-header">
        <div className="Home-panel">
          <Link className="button" to="/createroom">
            Játék
          </Link>
          <Link className="button" to="/connectroom">
            Csatlakozás
          </Link>
          <Link className="button" to="/rules">
            Szabályok
          </Link>

          </div>
          {/* <div className="bead2panel">
            <div>
              2. beadandó 
            </div>
            <hr />
            <Link className="bead2button" onClick={handleClick} to="/game">
              Játékoldal
            </Link>
          </div> */}
      </header>
    </div>
  );
}

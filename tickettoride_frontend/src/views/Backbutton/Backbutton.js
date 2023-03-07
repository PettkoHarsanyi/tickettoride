import { Link } from "react-router-dom";
import "../../css/Backbutton.css";
import { leaveGame } from "../socket";

export function Backbutton() {
  return (
    <Link to="/" className="backButton" onClick={leaveGame}>
      Vissza
    </Link>
  );
}

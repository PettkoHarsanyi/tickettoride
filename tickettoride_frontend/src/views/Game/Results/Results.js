import { useHistory } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import { Player } from "./Player";
import "../../../css/Results.css";
import { leaveGame } from "../../socket";

export function Results({ open, close, players }) {
  let history = useHistory();

  function handleClick() {
    leaveGame();
    history.push("/");
  }

  return (
    <>
      <Modal className="panel" open={open} onClose={close}>
        <div className="divTitle">Összegző táblázat:</div>
        <table className="tg">
          <thead>
            <tr>
              <th className="tg-9wq8"></th>
              <th className="tg-9wq8">Utak pontja</th>
              <th className="tg-9wq8">Célok pontja</th>
              <th className="tg-9wq8">Leghosszabb út</th>
              <th className="tg-9wq8">Összpontszám</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <Player key={player.id} player={player} />
            ))}
            
          </tbody>
        </table>
        <div className="endButton" onClick={handleClick}>
          Főmenü
        </div>
      </Modal>
    </>
  );
}

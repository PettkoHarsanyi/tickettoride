import { Destcard } from "./Destcard";
import "../../../css/Playerhand.css";
import { Traincard } from "./Traincard";

export function Playerhand({ player, highLightCity }) {
  return (
    <div className="playerhand">
      <div>{player.name} keze:</div>
      <div id="vonatok">
         {player.trains.map((train,index) => (<Traincard key={index} train={train}></Traincard>))} 
      </div>
      Útvonalak:
      <div id="utvonalak">
        {player.destinations.map((dest,index) => (
           <Destcard key={index} from={dest.fromCity} to={dest.toCity} highLightCity={highLightCity}></Destcard>
        ))}
      </div>
    </div>
  );
}

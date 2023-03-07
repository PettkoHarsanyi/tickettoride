import React, { useRef, useEffect } from "react";
import { City } from "./City";
import "../../css/Connection.css"


export function GameMap({cities, citiesHighlighted, selectedCities, selectCity,connectionsOnMap}){
  const keyState = useRef(200);

  useEffect(()=>{
    keyState.current = keyState.current + 1;
  },[connectionsOnMap])

  return (
    <div className="gameMap">
      {cities.map((city) => <City key={city.id} city={city} citiesHighlighted={citiesHighlighted} selectedCities={selectedCities} selectCity={selectCity}/>)}
      {connectionsOnMap.map((connection,index) => {
        return <div id={index} key={index} className="connection" style={{left: connection.x-1+"%", top: connection.y-1+"%", backgroundColor: connection.color}}></div>
      })}
    </div>);
};

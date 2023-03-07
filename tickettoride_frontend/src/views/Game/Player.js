export function Player({player}){
  return(
    <div style={player.actual ? {backgroundColor:player.color, border:"0.3vh solid black"} : {}} className="leaderboardname" >
      {player.name}<br />{player.points} pont {player.cars} kocsi
    </div>
  )
}
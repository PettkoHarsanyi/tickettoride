import "../../css/Game.css";
import { GameMap } from "./GameMap";
import { Results } from "./Results/Results";
import { useEffect, useState } from "react";
import { Backbutton } from "../Backbutton/Backbutton";
import { Playerhand } from "./Playerhand/Playerhand";
import { Cardsets } from "./Cardsets";
import { Deck } from "./Deck";
import { useDispatch, useSelector } from "react-redux";
import { removeTrain } from "../../state/train/actions";
import { getTrains } from "../../state/train/selectors";
import { getDestinations } from "../../state/destination/selectors";
import { removeDest } from "../../state/destination/actions";
import { getPlayers } from "../../state/players/selectors";
import { addDestToPlayer, addTrainToPlayer, reduceWagons, removePlayer, removeTrainFromPlayer, setPlayerActual, setPlayerScore } from "../../state/players/actions";
import { Player } from "./Player";
import { ticketToRideData } from "../../assets/ticket-to-ride-data";
import { getHistory } from "../../state/history/selectors";
import { addHistory } from "../../state/history/actions";
import { getDeck } from "../../state/deck/selectors";
import { addCardToDeck } from "../../state/deck/actions";
import wagon from "../../assets/train.png";
import { store } from "../../state/store";
import { getSelf } from "../../state/self/selectors"
import { getConnectionsOnMap } from "../../state/connectionsOnMap/selectors";
import { addConection } from "../../state/connectionsOnMap/actions";
import { getChat } from "../../state/chat/selectors";
import { addMessage } from "../../state/chat/actions";
import { socket } from "../socket";
import { Chat } from "../Chat";

export function handleSendChat(){
  let message = document.getElementById("message").value;
  if(message!==""){document.getElementById("message").value = "";
    store.dispatch(addMessage(store.getState().self,message));
    socket.emit("sync-action",store.getState().room.roomId,{type:"MESSAGE_SENT",state:store.getState()},true,()=>{})
  }
}

export function Game() {
  const [open, setOpen] = useState(false);
  const [cities] = useState(()=>Object.values(ticketToRideData.cities));
  const [citiesHighlighted,setCitiesHighlighted] = useState(()=>({from: null, to: null}));
  const [selectedCities,setSelectedCities] = useState(() => ({from: null, to: null}));
  const [connections] = useState(()=>Object.values(ticketToRideData.connections));
  const [lastRound,setLastRound] = useState(()=>{return 2})
  const [round,setRound] = useState(()=> {return 0})

  const handleOpen = () => {
    calculateLongestRoad();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  

  const calculateLongestRoad = () => {
    var longest = 0;
    // var longestPlayer = null;
    // var connectionsChained = [];
    
    players.forEach(player => {
      connectionsOnMap.forEach(connection => {
        if(player.color === connection.color){
          // var actualLength = recursive(connection);
          // if(actualLength > longest){
          //   longest = actualLength;
          // }
        }
      })
    });

    // console.log("Longest road is " + longest + " units long")

  };

  // const recursive = (connection) => {
  //   console.log("i am checking " + connection.betweenCities.from + " " + connection.betweenCities.to)
  //   var number = 0;
  //   connectionsOnMap.forEach(cn => {
  //     if((cn.betweenCities.from === connection.to && cn.betweenCities.to !== connection.from) || (cn.betweenCities.to === connection.from && cn.betweenCities.to !== connection.from) ){
  //       number += recursive(cn);
  //     }else{
  //       return 1;
  //     }
  //   });
  //   console.log("number is " + number)
  // }

  const highLightCity = (city1,city2) => {
    setCitiesHighlighted({...citiesHighlighted, from: city1, to: city2})
  }

  const selectCity = (city) => {
    if(steps===2){

      if(selectedCities.from === null){
        setSelectedCities({...selectedCities, from: city.city, to: null})
      }else{
        if(selectedCities.from !== city.city){
          var canBeBuilt = false;
          var colorNeeded = null;
          var colorsNumberNeeded = null;
          var colorsNumberHave = null;
          var length = null;
          var pointsYouGet = null;
          var elements = null;
          var specialCardNumberHave = null;
          var specialCardNumberNeeded = null;
          var betweenCities = null;
          
          
          connections.forEach(connection => {
            if((connection.fromCity === city.city && connection.toCity === selectedCities.from) 
            || (connection.fromCity === selectedCities.from && connection.toCity === city.city)){
              colorNeeded = connection.color;
              colorsNumberNeeded = connection.elements.length;
              length = connection.elements.length;
              elements = connection.elements;
              betweenCities = {from: connection.fromCity, to: connection.toCity}
              canBeBuilt = true;
            }
          });

          if(canBeBuilt){

            players[actual].trains.forEach(train => {
              if(train.color === colorNeeded){
                colorsNumberHave++;
              }
              if(train.color === "engine"){
                specialCardNumberHave++;
              }
            });
    
            if(colorsNumberHave >= colorsNumberNeeded){
              canBeBuilt = true;
            }else if(specialCardNumberHave >= colorsNumberNeeded-colorsNumberHave){
              canBeBuilt = true;
              specialCardNumberNeeded = colorsNumberNeeded-colorsNumberHave;
            }else{
              canBeBuilt = false;
            }
  
            connectionsOnMap.forEach(connection => {
              if((connection.betweenCities.from === betweenCities.from && connection.betweenCities.to === betweenCities.to) 
                || (connection.betweenCities.from === betweenCities.to && connection.betweenCities.to === betweenCities.from)){
                  canBeBuilt = false;
                }
            });
  
            // var deletionsNeeded = colorsNumberHave + specialCardNumberNeeded;
  
            if(length === 1){
              pointsYouGet = 1;
            }else if(length === 2){
              pointsYouGet = 2;
            }else if(length === 3){
              pointsYouGet = 4;
            }else if(length === 4){
              pointsYouGet = 7;
            }else if(length === 5){
              pointsYouGet = 10;
            }else if(length === 6){
              pointsYouGet = 15;
            }else{
              pointsYouGet = 21;
            }
    
            if(canBeBuilt){                                                                // HA MINDEN TELJESÜL RÁ, AKKOR ÉPÍTŐDHET
              if(selectedCities.from !== null && selectedCities.to === null){
                setSelectedCities({...selectedCities, to: city.city})
                dispatchPlayers(setPlayerScore(players[actual],pointsYouGet));
                dispatchPlayers(reduceWagons(players[actual],length))
                dispatchHistory(addHistory(players[actual].name,"utat épített"))
  
                var deletedColor = 0;
                var deletedSpecial = 0;
  
                if(colorsNumberHave>0){
                  players[actual].trains.forEach(train => {
                    if(train.color === colorNeeded && deletedColor < colorsNumberNeeded){
                      dispatchPlayers(removeTrainFromPlayer(players[actual],train))
                      deletedColor++;
                    }
                  });
                }
                if(specialCardNumberNeeded>0){

                  players[actual].trains.forEach(train => {
                    if(train.color === "engine" && deletedSpecial < specialCardNumberNeeded){
                      dispatchPlayers(removeTrainFromPlayer(players[actual],train))
                      deletedSpecial++;
                    }
                  });
                }
  
                
                
                setTimeout(()=>{
  
                  setSelectedCities({...selectedCities, from: null, to: null});

                  elements.forEach(element => {
                    dispatchHistory(addConection({color: players[actual].color, x:element.x, y: element.y, betweenCities: betweenCities}))
                  });
                  circlePlayers();
                },500)
              }          
            }
          }
        }
    
      }
      if(selectedCities.from === city.city){
        setSelectedCities({...selectedCities, from: null, to: null})
      }
      if(selectedCities.to === city.city){
        setSelectedCities({...selectedCities, to: null})
      }
    }


    // if(city.city === selectedCities.from){
    //   setSelectedCities({...selectedCities, from: null, to: null})
    // }
    // if(selectedCities.from === null){
    //   setSelectedCities({...selectedCities, from: city.city, to: null})
    // }
    // if(selectedCities.from !== null){
    //   setSelectedCities({...selectedCities, to: city.city})
    // }
  }

  // useEffect(()=>{
  //   // connectionsOnMap.map(connection=> console.log(connection.x + " " + connection.y + " " + connection.color))
  // },[connectionsOnMap])

  const trains = useSelector(getTrains);
  const destinations = useSelector(getDestinations);
  const players = useSelector(getPlayers);
  const history = useSelector(getHistory);
  const deck = useSelector(getDeck);
  const self = useSelector(getSelf);
  const player = useSelector(state => state.players.players.find(player => player.name === self) || {id: 10, name: self, actual: false, trains: [], destinations: [], cars: 45, points: 0, color: null});
  const connectionsOnMap = useSelector(getConnectionsOnMap);
  const messages = useSelector(getChat);

  useEffect(()=>{
    document.getElementById("texts").scrollTop = document.getElementById("texts").scrollHeight;
  },[messages])

  const getRandTrain = () => { return(Math.floor(Math.random() * trains.length))}
  const getRandDest = () => { return(Math.floor(Math.random() * destinations.length))}
  // if(players.length === 0){
  //   players[0] = {id: Date.now(), name: "Unnamed", actual: false, trains: [], destinations: []}
  // }else{
  //   players[0] = null;
  // }
  
  const [actual,setActual] = useState(() => {return 0});
  // const [round, setRound] = useState(()=> {return 1});
  const [steps, setSteps] = useState(() => {return 2});

  const dispatchTrain = useDispatch();
  const dispatchDest = useDispatch();
  const dispatchPlayers = useDispatch();
  const dispatchHistory = useDispatch();
  const dispatchDeck = useDispatch();
  const dispatchConnections = useDispatch();



  useEffect(() => {
    // setActual(players.findIndex(player => player.actual))
    let ind = players.findIndex(player => player.actual)
    if(ind >=0) setActual(players.findIndex(player => player.actual))
  },[players])

  useEffect(()=>{
    if(players[players.findIndex(player => player.actual)] === players[0]){
      setRound(prev=> prev+1);
    }
  },[players[0].actual])


  useEffect(() => {
    dispatchPlayers(setPlayerActual(players[0]))

    // var randomDestNumbers = [];
    // for(let i = 0; i < players.length; i++){
    //   for(let j = 0; j < 5; j++){
    //     let randNumber;
  
    //     do{
    //       var isIn = false;
    //       randNumber = Math.floor(Math.random() * destinations.length) 

    //       randomDestNumbers.forEach(random => {
    //         if(random === randNumber){
    //           isIn = true;
    //         }
    //       });
    //     }while(isIn)
  
    //     randomDestNumbers[j] = randNumber;
    //     addDest(players[i],destinations[randNumber]);
    //   }
    // }

    // var randomTrainNumbers = [];
    // for(let i = 0; i < players.length; i++){
    //   for(let j = 0; j < 4; j++){
    //     let randNumber;
  
    //     do{
    //       isIn = false;
    //       randNumber = Math.floor(Math.random() * trains.length) 

    //       randomTrainNumbers.forEach(random => {
    //         if(random === randNumber){
    //           isIn = true;
    //         }
    //       });
    //     }while(isIn)
  
    //     randomTrainNumbers[j] = randNumber;
    //     addTrain(players[i],trains[randNumber]);
    //   }
    // }

    // var randomDeckNumbers = [];
    // for(let i = 0; i < 4; i++){
    //   let randNumber;
    //   do{
    //     isIn = false;
    //     randNumber = Math.floor(Math.random() * trains.length) 

    //     randomDeckNumbers.forEach(random => {
    //       if(random === randNumber){
    //         isIn = true;
    //       }
    //     });
    //   }while(isIn)

    //   randomDeckNumbers[i] = randNumber;
    //   dispatchDeck(addCardToDeck(trains[randNumber],i))
    //   dispatchTrain(removeTrain(trains[randNumber]));
    // }

    // if(store.getState().self)
    for(let i = 0; i < 5; i++){
      const randTrain = getRandTrain();
      dispatchDeck(addCardToDeck(trains[randTrain],i))
      dispatchTrain(removeTrain(trains[randTrain]));
    }


  },[])

  const deckCardClicked = (train, pos) => {
    if(self === players[actual].name){
      if(selectedCities.from === null && selectedCities.to === null){
        if(steps===2 || steps === 1){
          if(steps===1 && train.color === "engine"){
          }else{
            const randTrain = getRandTrain();
            dispatchPlayers(addTrainToPlayer(players[actual],train))
            dispatchDeck(addCardToDeck(trains[randTrain],pos))
            dispatchTrain(removeTrain(trains[randTrain]));
            dispatchHistory(addHistory(players[actual].name," asztalról húzott " + changeToHun(train.color) + " kártyát"))
            if(train.color === "engine"){
              setSteps(prev => prev-2);
            }else{
              setSteps(prev => prev-1);
            }
          }
        }
      }
    }
    
  }

  const changeToHun = (text) => {
    switch (text) {
      case "yellow":
        return "sárga"
      case "black":
        return "fekete"
      case "gray":
        return "szürke"
      case "purple":
        return "lila"
      case "red":
        return "piros"
      case "white":
        return "fehér"
      case "blue":
        return "kék"
      case "engine":
        return "mozdony"
      case "green":
        return "zöld"
      case "orange":
        return "narancs"
    }
  } 

  const circlePlayers = () => {
    setActual((prevActual) => (prevActual+1) % players.length);
    dispatchPlayers(setPlayerActual(players[(actual+1) % players.length]));
  }

  const removePlayers = () => {
    players.forEach(player => {
      dispatchPlayers(removePlayer(player))
    });
  }

  const addDest = async (player,dest) =>{
    if(selectedCities.from == null && selectedCities.to == null){

      if(steps===2){
        if(destinations.length>0){
          await dispatchDest(removeDest(dest));
          await dispatchPlayers(addDestToPlayer(player, dest));
          await dispatchHistory(addHistory(player.name," útvonalkártyát húzott"))
        }
      }
    }
  }

  const addTrain = async (player,train) => {
    if(selectedCities.from === null && selectedCities.to === null){
      if(trains.length>0){
        if(steps>0){
            await dispatchTrain(removeTrain(train));
            await dispatchPlayers(addTrainToPlayer(player,train));
            await dispatchHistory(addHistory(player.name,"pakliból húzott " + changeToHun(train.color) + " kártyát"))

            

        }
      }
    }
  }

  useEffect(()=>{
    if(steps<=0){
      setTimeout(()=>{
        circlePlayers()
        setSteps(2);
        if(players[actual] === players[players.length-1]){

          // setRound(prev => prev+1);

          if(lastRound === 1){
            setLastRound(prev=>prev-1)
          }
        }
        if(lastRound === 0 && players[actual] === players[players.length-1]){
          setOpen(true);
        }
      },500);
    }

  },[steps]);

  useEffect(()=>{
    if((players[0].cars <= 2 || players[1].cars <= 2) && lastRound === 2){
      setLastRound(prev=>prev-1);
    }
  },[players[0].cars,players[1].cars])

  return (
    <>
      {/* <button onClick={circlePlayers}>
        SETACTUALPLAYER THE SECND
      </button> */}
      <Backbutton removePlayers={removePlayers}/>
      <div style={{textAlign: "left"}} className="chatg">
        <div style={{marginTop:"0.2vh"}}>Chat</div>
        <div id="texts" className="textsg" style={{fontSize:"1.5vh", overflowY:"scroll", paddingTop: "2vh", marginTop: "0.5vh", borderTop:"0.5vh solid black"}}>
          {messages.map((message) => {
            return <div key={message.message} style={{alignSelf: message.sender === store.getState().self ? "flex-end" : "flex-start", marginLeft: message.sender === store.getState().self ? "10vh" : "0.5vh", marginRight: message.sender !== store.getState().self ? "10vh" : "1vh", marginBottom:"0.5vh", border: "0.4vh solid black", padding: "0.5vh", borderRadius: "1vh", maxWidth: "70%", wordWrap: "break-word"}}>{message.sender}: {message.message}</div>
          })}
        </div>
        <div>
          <input className="inputfieldg" type="text" id="message"></input>
          <button className="sendButtong" onClick={handleSendChat}>Küld</button>
        </div>
      </div>
      <div className="Game">
        <header className="Game-header">
          <button onClick={handleOpen} className="resultsButton">
            Játék vége szimuláció
          </button>

          <div className="players-2">
            {players.map((player) => (
              <Player key={player.id} player={player}/>
            ))}
          </div>
          <div className="history">
            <div>Előzmények</div>
            <hr />
            <div>{history.length > 0 ? (history[(history.length-1)%2].name + " " + history[(history.length-1)%2].message) : ""}</div>
            <div>{history.length > 1 ? (history[history.length%2].name + " " + history[history.length%2].message) : ""}</div>
          </div>
          <GameMap cities={cities} citiesHighlighted={citiesHighlighted} selectedCities={selectedCities} selectCity={selectCity} connectionsOnMap={connectionsOnMap}/>
          <div className="round">{round}. kör</div>
          <Playerhand player={player} highLightCity={highLightCity} />
          <Cardsets
            trainDrawn={()=>{
              if(self === players[actual].name){
                addTrain(players[actual],trains[getRandTrain()]);
                if(selectedCities.from == null && selectedCities.to == null && (steps===2||steps===1) ) setSteps(steps => steps-1);}
              }
            }
                
            destinationDrawn={()=>{
              if(self === players[actual].name){
                addDest(players[actual],destinations[getRandDest()]);
                if(selectedCities.from == null && selectedCities.to == null && steps===2) setSteps(steps => steps-2);}}
              }

          />
          <Deck deck={deck} deckCardClicked={deckCardClicked}/>
          <div className="cars">{player.cars}<img className="wagon" alt="wagon" src={wagon} /></div>
        </header>
      </div>
      <Results open={open} close={handleClose} players={players} />
    </>
  );
}

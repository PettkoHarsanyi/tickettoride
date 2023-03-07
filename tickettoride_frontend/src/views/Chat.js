import { store } from "../state/store"

export function Chat({unqClass,messages,handleSendChat}){
  return(
  <div style={{textAlign: "left"}} className="chat">
    <div style={{marginTop:"1vh"}}>Chat</div>
    <div id="texts" className="texts" style={{fontSize:"2vh", overflowY:"scroll", paddingTop: "2vh", marginTop: "1vh", borderTop:"0.5vh solid black"}}>
      {messages.map((message) => {
        return <div key={message.message} style={{alignSelf: message.sender === store.getState().self ? "flex-end" : "flex-start", marginLeft: message.sender === store.getState().self ? "10vh" : "0.5vh", marginRight: message.sender !== store.getState().self ? "10vh" : "1vh", marginBottom:"0.5vh", border: "0.4vh solid black", padding: "0.5vh", borderRadius: "1vh", maxWidth: "70%", wordWrap: "break-word"}}>{message.sender}:<div style={{marginLeft: "2vh" }}>{message.message}</div></div>
      })}
    </div>
    <div>
      <input className="inputfield" type="text" id="message"></input>
      <button className="sendButton" onClick={handleSendChat}>Küld</button>
    </div>
  </div>)
}
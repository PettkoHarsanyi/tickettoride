import engine from  "../../assets/engine.png"

export function Deckcard({ train,pos,deckCardClicked }) {
  let bgcolor = "";
  let border = "";
  if(train){
    if (train.color === "engine") {
      border = "#00fff8";
      bgcolor = "gray";
    } else {
      bgcolor = train.color;
    }
  }else{
    bgcolor = "null"
  }
  return (
    <div
      className="traincard"
      style={{ backgroundColor: `${bgcolor}`, borderColor: `${border}`, border:train.color==="engine"?"0.7vh solid #00fff8":"0.3vh solid black",
    }}
      onClick={()=>deckCardClicked(train,pos)} 
    >
      {(train.color === "engine") ? <img className="engine" alt="engine" src={engine} /> : ""}
    </div>
  );
}

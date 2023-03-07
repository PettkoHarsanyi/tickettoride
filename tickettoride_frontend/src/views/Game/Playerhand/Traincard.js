export function Traincard({ train }) {
  let bgcolor = "";
  let border = "";
  if(train){
    if (train.color === "engine") {
      border = "#00fff8";
      bgcolor = "black";
    } else {
      bgcolor = train.color;
    }
  }else{
    bgcolor = "null"
  }
  return (
    <div
      className="traincard2"
      style={{ backgroundColor: `${bgcolor}`, borderColor: `${border}`, border:train.color==="engine"?"0.7vh solid #00fff8":"0.3vh solid black", outlineOffset: train.color ==="engine"?"-10px":""}}
    >
    </div>
  );
}

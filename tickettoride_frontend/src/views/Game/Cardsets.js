import "../../css/Cardsets.css";

export function Cardsets({ trainDrawn, destinationDrawn }) {
  return (
    <div className="cardsets-1">
      <div onClick={trainDrawn}></div>
      <div onClick={destinationDrawn}></div>
    </div>
  );
}

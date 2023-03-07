import { Deckcard } from "./Deckcard";

export function Deck({deck,deckCardClicked}) {
  return (
    <div className="deck-1">
      <Deckcard train={deck[0]} pos={0} deckCardClicked={deckCardClicked}/>
      <Deckcard train={deck[1]} pos={1} deckCardClicked={deckCardClicked}/>
      <Deckcard train={deck[2]} pos={2} deckCardClicked={deckCardClicked}/>
      <Deckcard train={deck[3]} pos={3} deckCardClicked={deckCardClicked}/>
      <Deckcard train={deck[4]} pos={4} deckCardClicked={deckCardClicked}/>
    </div>
  );
}

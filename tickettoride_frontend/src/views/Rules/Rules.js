import { Backbutton } from "../Backbutton/Backbutton";
import "../../css/Rules.css";

export function Rules() {
  return (
    <>
      <Backbutton />
      <div className="Rules">
        <header className="Rules-header">
          <div className="Rules-panel">
            <p>Játékszabályzat</p>
            <p className="large">1. A játék előkészületei:</p>
            <p>
              Vasútkocsi kártyák:
              <br />
              Lila, fehér, kék, sárga, narancs, fekete, piros, zöld:
              mindegyikből 12db mozdony: 14db.
            </p>
            <p className="large">2. A játék menete:</p>

            <p>
              A játékot 1-5 játékos játszhatja. Célunk vasútvonalak építésével
              minél több pontot szerezni. Pontot a megépített vasútvonalak
              hossza után, illetve a játék közben húzott célok
              (menetjegy-kártyák) teljesítésével lehet kapni, illetve a játék
              végén plusz pont jár a leghosszabb összefüggő vasútvonalért is. A
              nem teljesített célok pontjai levonásra kerülnek. A játék elején
              minden játékos kap 1 hosszú célt, és 3 rövid célt. A 3 rövid
              célból legalább 1-et meg kell tartani. A célok mellett kapunk még
              4 vasútkocsi-kártyát is. Az asztalon elő van készítve 5 felfedett
              vasútkocsi kártya, a vasútkocsi-kártyák talonja, valamint a célok
              talonja. Minden játékosnak emellett van 45 vagonja is.
            </p>
            <p className="large">3. Játékos lehetőségei:</p>
            <p>
              Egy játékos a körében a következő három lehetőség közül választ:
              <br />
              <br />
              1. Vasútkocsi-kártyát húz:
              <br />
              Ezt megteheti a felfedett kártyák közül, ilyenkor húzás után
              azonnal pótolni kell a lapot, vagy a talonból is húzhat. A mozdony
              két kártyát ér, így azt másodkként nem lehet húzni a felfedettek
              közül (talonból akár 2 is húzható). Ha a felfedett lapok között 3
              mozdony van, akkor az 5 lap megy a dobópakliba, és 5 újat kell
              osztani.
              <br />
              <br />
              2. Útvonalat épít:
              <br />
              Ekkor az útvonal színének megfelelő mennyiségű lapot kell
              kijátszania a kezéből. Szürke utak bármilyen, de egyféle színből
              megépíthetők. A mozdonyt ábrázoló utakhoz legalább annyi mozdonyt
              kell kijátszani, ahányat az út ábrázol. A mozdony egyébként joker,
              bármilyen vonatkocsi-kártyát helyettesíthet. A vagonokat fel kell
              helyezni a táblára. Az épített út pontértéke azonnal feltüntetésre
              kerül. Ahol dupla sínpár van két város között, oda ugyanaz a
              játékos nem építhet kétszer. Továbbá 1-3 játékos esetén pedig csak
              az egyik sínpár építhető meg.
              <br />
              <br />
              3. Új célkártyákat húz:
              <br />3 új célkártya húzható, ebből legalább 1-et (legfeljebb
              3-at) meg kell tartani.
            </p>
            <p className="large">4. Játék vége:</p>
            <p>
              A játék akkor ér véget, ha valamelyik játékos raktárában a vagonok
              száma 2 vagy kevesebb lesz. Ekkor az összes játékosnak van még egy
              utolsó köre, beleértve azt is, akinek először lefogyott ennyire.
              Ezután a pontok kiszámítása következik:
              <br />
              <br />- a teljesített célok pontértéke hozzáadásra kerül; <br />-
              a nem teljesített célok értéke levonásra kerül; <br /> - a
              leghosszabb összefüggő út tulajdonosa +10 pontot kap.
            </p>
          </div>
        </header>
      </div>
    </>
  );
}

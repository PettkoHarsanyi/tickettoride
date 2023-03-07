import "../../css/City.css"

export function City({city, citiesHighlighted, selectedCities, selectCity}){
  return(
    <div id={city.id} 
      style={{
      top: city.y-1+"%",
      left: city.x-1+"%", 
      backgroundColor: (citiesHighlighted.from===city.city || citiesHighlighted.to===city.city || selectedCities.from === city.city || selectedCities.to === city.city)?"red":"khaki",
      width: (citiesHighlighted.from===city.city || citiesHighlighted.to===city.city || selectedCities.from === city.city || selectedCities.to === city.city)? "2.6%":"1.3%",
      height: (citiesHighlighted.from===city.city || citiesHighlighted.to===city.city || selectedCities.from === city.city || selectedCities.to === city.city)?"4%":"2%",
      } } className="city"
      onClick={()=>selectCity(city)}
      >
    </div>
  )
}
export function Destcard({ from, to, highLightCity}) {
  return (
    <div className="destcard" onMouseEnter={() => {highLightCity(from,to)}} onMouseLeave={() => highLightCity(null,null)}>
      <div>
        {from} - {to}
      </div>
    </div>
  );
}

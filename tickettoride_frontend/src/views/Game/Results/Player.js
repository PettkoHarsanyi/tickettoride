export function Player({ player }) {
  return (
    <tr>
      <td className="tg-9wq8">{player.name}</td>
      <td className="tg-9wq8">{player.points}</td>
      <td className="tg-9wq8">{player.goalPoints}</td>
      <td className="tg-9wq8">{player.longestRoad}</td>
      <td className="tg-9wq8">{player.points}</td>
    </tr>
  );
}

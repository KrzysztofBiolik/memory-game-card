import "../styles/game.scss";
import { useGameStore } from "../store";
import Tile from "./Tile";
import Stats from "./Stats";

const Board: React.FC = () => {
  const { tiles, timeElapsed, attempts, setGameStarted } = useGameStore();

  return (
    <div className="game-screen">
      <div className="game-board">
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            id={tile.id}
            image={tile.image}
            isMatched={tile.isMatched}
          />
        ))}
      </div>
      <Stats headers={["Czas (s)", "Próby"]} data={[[timeElapsed, attempts]]} />
      <button onClick={() => setGameStarted(false)}>Nowa gra</button>
    </div>
  );
};

export default Board;

import "../styles/game.scss";
import { useGameStore } from "../store";
import Tile from "./Tile";
import Stats from "./Stats";

const Board: React.FC = () => {
  const { tiles } = useGameStore();

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
      <Stats />
    </div>
  );
};

export default Board;

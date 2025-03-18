import "../styles/game.scss";
import { useEffect } from "react";
import { useGameStore } from "../store";
import Tile from "./Tile";

const Board: React.FC = () => {
  const { tiles, initializeGame } = useGameStore();

  useEffect(() => {
    initializeGame(); // Ładujemy kafelki na start
  }, []);

  return (
    <div className="game-board">
      {tiles.map((tile) => (
        <Tile key={tile.id} id={tile.id} image={tile.image} />
      ))}
    </div>
  );
};

export default Board;

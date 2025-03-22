import { useEffect, useState } from "react";
import { useGameStore } from "../store";
import Tile from "./Tile";
import Stats from "./Stats";
import "../styles/game.scss";

const Board: React.FC = () => {
  const { tiles, attempts, timeElapsed, setGameStarted } = useGameStore();
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (tiles.length > 0 && tiles.every((tile) => tile.isMatched)) {
      setGameOver(true);
    }
  }, [tiles]);

  return (
    <div className="game-screen">
      {/* Jeśli gra trwa, wyświetl statystyki i planszę */}
      {!gameOver ? (
        <>
          <Stats headers={["Czas (s)", "Próby"]} data={[[timeElapsed, attempts]]} />
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
        </>
      ) : (
        // Jeśli gra się skończyła, wyświetl baner końcowy
        <div className="game-over-banner">
          <h2>Twój wynik!</h2>
          <Stats headers={["Czas (s)", "Próby"]} data={[[timeElapsed, attempts]]} />
          <button onClick={() => setGameStarted(false)}>Powrót</button>
        </div>
      )}
    </div>
  );
};

export default Board;

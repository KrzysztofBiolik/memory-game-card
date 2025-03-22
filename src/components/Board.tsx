import React, { useEffect, useState } from "react";
import { useGameStore } from "../store";
import Tile from "./Tile";
import Stats from "./Stats";
import Button from "./Button"; // Importujemy Button
import "../styles/game.scss";

const Board: React.FC = () => {
  const {
    tiles,
    difficulty,
    attempts,
    timeElapsed,
    setGameStarted,
    initializeGame,
  } = useGameStore();
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (tiles.length > 0 && tiles.every((tile) => tile.isMatched)) {
      setGameOver(true);
    }
  }, [tiles]);

  return (
    <div className="game-screen">
      {!gameOver ? (
        <>
          <div className="buttons">
            <Button
              onClick={() => setGameStarted(false)}
              className="zeroMargin"
            >
              Powrót
            </Button>
            <Stats
              headers={["Czas (s)", "Próby"]}
              data={[[timeElapsed, attempts]]}
            />
            <Button
              onClick={() => initializeGame(difficulty)}
              className="zeroMargin"
            >
              Restart
            </Button>
          </div>

          <div
            className={`game-board ${
              difficulty === "easy" ? "" : "moreTiles"
            }`}
          >
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
        <div className="game-over-banner">
          <h2>Twój wynik!</h2>
          <Stats
            headers={["Czas (s)", "Próby"]}
            data={[[timeElapsed, attempts]]}
          />
          <Button onClick={() => setGameStarted(false)} className="secondary">
            Powrót
          </Button>
        </div>
      )}
    </div>
  );
};

export default Board;

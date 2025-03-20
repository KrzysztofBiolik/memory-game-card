import React from "react";
import { useGameStore } from "../store";

const StartScreen: React.FC = () => {
  const { difficulty, setDifficulty, initializeGame } = useGameStore();

  return (
    <div className="start-screen">
      <h2 className="subHeader">Wybierz poziom trudności</h2>
      <div className="difficulty-container">
        <label>
          Poziom trudności:{" "}
          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value as "easy" | "medium" | "hard")
            }
          >
            <option value="easy">Łatwy (16 kafelków)</option>
            <option value="medium">Średni (24 kafelki)</option>
            <option value="hard">Trudny (36 kafelków)</option>
          </select>
        </label>
        <button onClick={() => initializeGame(difficulty)}>
          Rozpocznij grę
        </button>
      </div>
    </div>
  );
};

export default StartScreen;

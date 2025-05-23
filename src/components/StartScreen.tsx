import React, { useState, useEffect } from "react";
import { useGameStore } from "../store";
import Stats from "./Stats";
import Button from "./Button"; // Importujemy Button
import "../styles/startScreen.scss";

interface GameResult {
  time: number;
  attempts: number;
  difficulty: string;
  date: string;
}

const StartScreen: React.FC = () => {
  const { difficulty, setDifficulty, initializeGame } = useGameStore();
  const [showStats, setShowStats] = useState(false);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  useEffect(() => {
    const storedResults = JSON.parse(
      localStorage.getItem("gameResults") || "[]"
    );
    setGameResults(storedResults);
  }, []);

  return (
    <div className="startScreen">
      <div className="form">
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
          <Button onClick={() => initializeGame(difficulty)}>Rozpocznij grę</Button>
        </div>
      </div>
      <Button onClick={() => setShowStats(!showStats)}>
        {showStats ? "Ukryj statystyki" : "Pokaż statystyki"}
      </Button>
      {showStats && (
        <div className="stats-container">
          <h2>Historia gier</h2>
          <Stats
          className={["results-table"]}
            headers={["#", "Czas (s)", "Próby", "Trudność", "Data"]}
            data={gameResults.map((result, index) => [
              index + 1,
              result.time,
              result.attempts,
              result.difficulty,
              new Date(result.date).toLocaleString(),
            ])}
          />
        </div>
      )}
    </div>
  );
};

export default StartScreen;

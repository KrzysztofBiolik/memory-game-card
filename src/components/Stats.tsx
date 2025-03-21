import { useGameStore } from "../store";

const Stats: React.FC = () => {
  const { setGameStarted, attempts, timeElapsed } = useGameStore();

  return (
    <div className="stats-container">
      <p>
        Liczba prób: <strong>{attempts}</strong>
      </p>
      <p>
        Czas gry: <strong>{timeElapsed} s</strong>
      </p>
      <button className="restart-button" onClick={() => setGameStarted(false)}>
        Powrót
      </button>
    </div>
  );
};

export default Stats;

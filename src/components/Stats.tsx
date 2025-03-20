import { useGameStore } from "../store";

const Stats: React.FC = () => {
  const { setGameStarted, attempts } = useGameStore();

  return (
    <div className="stats-container">
      <p>
        Liczba prób: <strong>{attempts}</strong>
      </p>
      <button className="restart-button" onClick={() => setGameStarted(false)}>
        Powrót
      </button>
    </div>
  );
};

export default Stats;

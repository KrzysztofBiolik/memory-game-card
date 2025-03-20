import { useGameStore } from "../store";

const Stats: React.FC = () => {
  const {setGameStarted } = useGameStore();

  return (
    <div className="stats-container">
      <button className="restart-button" onClick={() => setGameStarted(false)}>
        Powrót
      </button>
    </div>
  );
};

export default Stats;

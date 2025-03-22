import { useGameStore } from "./store";
import Board from "./components/Board";
import StartScreen from "./components/StartScreen";
import "./styles/app.scss";

const App: React.FC = () => {
  const { gameStarted } = useGameStore();

  return (
    <div className="app">
      <div className="banner">
        <h1>Memory Card</h1>
      </div>
      <div className="content">{gameStarted ? <Board /> : <StartScreen />}</div>
    </div>
  );
};

export default App;

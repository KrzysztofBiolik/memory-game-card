import Board from "./components/Board";
import "./styles/game.scss";
import "./styles/app.scss";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="banner">
        <h1>Memory Card</h1>
      </div>
      <Board />
    </div>
  );
};

export default App;

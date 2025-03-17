import "../styles/game.scss";
import Tile from "./Tile";

const Board: React.FC = () => {
  const tiles = Array.from({ length: 16 }, (_, index) => <Tile key={index} />);

  return <div className="game-board">{tiles}</div>;
};

export default Board;

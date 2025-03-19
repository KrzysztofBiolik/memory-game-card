import { Tile as TileType } from "../types";
import { useGameStore } from "../store";

const Tile: React.FC<TileType> = ({ id, image }) => {
  const { selectTile, selectedTiles, tiles } = useGameStore();

  const isRevealed = selectedTiles.some((tile) => tile.id === id);
  const isMatched = tiles.find((tile) => tile.id === id)?.isMatched;

  return (
    <div
      className={`tile ${isRevealed ? "revealed" : ""} ${
        isMatched ? "hidden" : ""
      }`}
      onClick={() => selectTile({ id, image, isMatched: false })}
    >
      <span className="tile-content">
        {isRevealed ? image : ""}
      </span>
    </div>
  );
};

export default Tile;

import { Tile as TileType } from "../types";
import { useGameStore } from "../store";
import "../styles/tile.scss";

const Tile: React.FC<TileType> = ({ id, image }) => {
  const { selectTile, selectedTiles, tiles } = useGameStore();
  const tileData = tiles.find((t) => t.id === id) || { isMatched: false };

  const isRevealed =
    selectedTiles.some((tile) => tile.id === id) || tileData.isMatched;

  return (
    <div
      className={`tile ${isRevealed ? "revealed" : ""} ${
        tileData.isMatched ? "hidden" : ""
      }`}
      onClick={() => selectTile({ id, image, isMatched: false })}
    >
      <div className="tile-content">{isRevealed ? <img src={image} alt="tile" />: ""}</div>
    </div>
  );
};

export default Tile;

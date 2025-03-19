import { create } from "zustand";
import { generateTiles } from "./utils/useTileGenerator";
import { Tile } from "./types";
import { images } from "./assets/image";

interface GameState {
  tiles: Tile[];
  initializeGame: () => void;
  selectTile: (tile: Tile) => void;
  selectedTiles: Tile[];
}

export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  selectedTiles: [],

  initializeGame: () =>
    set({ tiles: generateTiles(images), selectedTiles: [] }),

  selectTile: (tile) => {
    const { selectedTiles, tiles } = get();

    // Ignorujemy kliknięcie, jeśli już wybrano 2 kafelki lub kafelek jest dopasowany
    if (
      selectedTiles.length === 2 ||
      selectedTiles.some((t) => t.id === tile.id)
    )
      return;

    // Dodanie do tablice selectedTiles klikniętego kafelka
    const newSelected = [...selectedTiles, tile];
    set({ selectedTiles: newSelected });

    // jesli długość tablicy selectedTiles osiąga 2 to sprawdzamy dopasowanie kafelków
    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const isMatch = first.image === second.image;

      // w zależności od dopasowanie kafelków w tablicy Tiles zostawiamy wartości
      // isMatched w obu kafelkach niezmienione lub zmieniamy je na true
      setTimeout(() => {
        set({
          tiles: isMatch
            ? tiles.map((t) =>
                t.id === first.id || t.id === second.id
                  ? { ...t, isMatched: true }
                  : t
              )
            : tiles,
          selectedTiles: [],
        });
      }, 1000);
    }
  },
}));

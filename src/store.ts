import { create } from "zustand";
import { generateTiles } from "./utils/useTileGenerator";
import { Tile } from "./types";
import { images } from "./assets/image";

type Difficulty = "easy" | "medium" | "hard";

interface GameState {
  tiles: Tile[];
  initializeGame: (difficulty: Difficulty) => void;
  selectTile: (tile: Tile) => void;
  selectedTiles: Tile[];
  gameStarted: boolean;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  setGameStarted: (started: boolean) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  selectedTiles: [],
  gameStarted: false,
  difficulty: "easy", // Domyślny poziom

  initializeGame: (difficulty: Difficulty) => {
    const numPairs =
      difficulty === "easy" ? 8 : difficulty === "medium" ? 12 : 16;
    // Używamy tylko tylu obrazków, ile par chcemy mieć
    set({
      tiles: generateTiles(images.slice(0, numPairs)),
      selectedTiles: [],
      gameStarted: true,
      difficulty, // Ustawienie wybranego poziomu trudności
    });
  },

  setDifficulty: (difficulty) => {
    set({ difficulty });
  },

  setGameStarted: (started: boolean) => set({ gameStarted: started }),

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

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
  attempts: number;
  timeElapsed: number; //liczba sekund, które upłynęły od rozpoczęcia gry.
  timer: number | null; //identyfikator setInterval, czyli liczba zwracana przez window.setInterval().
  stopTimer: () => void;
  saveResult: () => void; // Dodajemy metodę zapisu wyniku
}

export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  selectedTiles: [],
  gameStarted: false,
  difficulty: "easy",
  attempts: 0,
  timeElapsed: 0,
  timer: null,

  initializeGame: (difficulty: Difficulty) => {
    get().stopTimer();
    // Resetujemy czas i zatrzymujemy poprzedni timer

    const numPairs =
      difficulty === "easy" ? 8 : difficulty === "medium" ? 12 : 16;

    const timer = window.setInterval(() => {
      set((state) => ({ timeElapsed: state.timeElapsed + 1 }));
    }, 1000);

    set({
      tiles: generateTiles(images.slice(0, numPairs)),
      selectedTiles: [],
      gameStarted: true,
      difficulty,
      attempts: 0,
      timeElapsed: 0,
      timer,
    });
  },

  setDifficulty: (difficulty) => {
    set({ difficulty });
  },

  setGameStarted: (started: boolean) => {
    if (!started) {
      get().stopTimer(); // Zatrzymanie timera
      set({ gameStarted: false, timeElapsed: 0, attempts: 0 });
    }
  },

  stopTimer: () => {
    const { timer } = get();
    if (timer !== null) {
      clearInterval(timer);
      set({ timer: null });
    }
  },

  selectTile: (tile) => {
    const { selectedTiles, tiles, attempts } = get();

    if (
      selectedTiles.length === 2 ||
      selectedTiles.some((t) => t.id === tile.id)
    )
      return;

    const newSelected = [...selectedTiles, tile];
    set({ selectedTiles: newSelected });

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const isMatch = first.image === second.image;

      setTimeout(() => {
        let updatedTiles = tiles;

        if (isMatch) {
          updatedTiles = tiles.map((t) =>
            t.id === first.id || t.id === second.id
              ? { ...t, isMatched: true }
              : t
          );
          set({ tiles: updatedTiles });
        }

        set({ selectedTiles: [], attempts: attempts + 1 });

        // Sprawdzenie, czy wszystkie kafelki są dopasowane **po aktualizacji**
        if (updatedTiles.every((t) => t.isMatched)) {
          get().stopTimer();
          get().saveResult();
        }
      }, 500);
    }
  },

  saveResult: () => {
    const { timeElapsed, difficulty, attempts } = get();
    const storedResults = JSON.parse(localStorage.getItem("gameResults") || "[]");

    const newResult = {
      time: timeElapsed,
      attempts,
      difficulty,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "gameResults",
      JSON.stringify([...storedResults, newResult])
    );
  },
}));

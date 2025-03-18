import { create } from "zustand";
import { generateTiles } from "./utils/useTileGenerator";
import { Tile } from "./types";
import { images } from "./assets/image";


interface GameState {
  tiles: Tile[];
  initializeGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  tiles: [],
  initializeGame: () => set({ tiles: generateTiles(images) }),
}));

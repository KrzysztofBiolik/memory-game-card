import { Tile } from "../types"

export const useGenerateTiles = (images: string[]): Tile[] => {
    const duplicated = images.flatMap((img, index) => [
      { id: index * 2, image: img, isMatched: false },
      { id: index * 2 + 1, image: img, isMatched: false },
    ]);
  
    return duplicated.sort(() => Math.random() - 0.5); // Mieszamy kafelki
  };
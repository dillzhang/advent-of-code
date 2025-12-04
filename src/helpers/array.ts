export const range = (length: number) => {
  return [...Array(length).keys()];
};

export const to2DArray = (input: string[], delimiter = ""): string[][] => {
  return input.map((line) => line.split(delimiter));
};

export const map2d = <T, U>(
  input: T[][],
  transform: ((cell: T, x: number, y: number) => U) | ((cell: T) => U)
): U[][] => {
  return input.map((row, x) => row.map((cell, y) => transform(cell, x, y)));
};

const DELTAS = [-1, 0, 1];
export const getNeighborsIndices = (
  cellX: number,
  cellY: number,
  grid: any[][]
) => {
  return DELTAS.flatMap((dx) => {
    return DELTAS.map((dy) => [cellX + dx, cellY + dy]);
  }).filter(([dx, dy]) => {
    if (dx === cellX && dy === cellY) {
      return false;
    }
    if (dx < 0 || dx >= grid.length) {
      return false;
    }
    if (dy < 0 || dy >= grid[dx].length) {
      return false;
    }
    return true;
  });
};

export const getNeighborValues = <T>(
  cellX: number,
  cellY: number,
  grid: T[][]
): T[] => {
  return getNeighborsIndices(cellX, cellY, grid).map(([x, y]) => {
    return grid[x][y];
  });
};

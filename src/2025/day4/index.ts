import { getNeighborValues, map2d, to2DArray } from "../../helpers/array";

export default async (input: string[]) => {
  let grid = to2DArray(input);
  let gridNotUpdated = false;
  let total = 0;
  while (!gridNotUpdated) {
    gridNotUpdated = true;
    grid = map2d(grid, (cell, x, y) => {
      if (cell === ".") {
        return ".";
      }
      const neighboringRolls = getNeighborValues(x, y, grid).filter(
        (v) => v === "@"
      ).length;

      if (neighboringRolls < 4) {
        gridNotUpdated = false;
        total += 1;
        return ".";
      } else {
        return "@";
      }
    });

    grid.map((row, x) => {
      return row.map((cell, y) => {});
    });
  }
  return total;
};

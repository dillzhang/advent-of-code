import { range } from "../../helpers/array";

const isPointInPolygon = (
  px: number,
  py: number,
  vertices: [number, number][]
): boolean => {
  let inside = false;
  for (let i = -1; i < vertices.length - 1; i++) {
    const [x1, y1] = vertices.at(i)!;
    const [x2, y2] = vertices.at(i + 1)!;

    const [minX, maxX] = [Math.min(x1, x2), Math.max(x1, x2)];
    const [minY, maxY] = [Math.min(y1, y2), Math.max(y1, y2)];

    // On a horizontal edge
    if (minY === maxY && minY === py && minX <= px && px <= maxX) {
      return true;
    }

    // Check if we pass vertical sides
    if (minX === maxX) {
      if (py >= minY && py < maxY && px < minX) {
        inside = !inside;
      }
    }
  }
  return inside;
};

export default async (input: string[]) => {
  const tiles = input.map((line) =>
    line.split(",").map((cor) => parseInt(cor))
  );
  const areas = tiles
    .flatMap(([x1, y1], i1) => {
      return tiles.slice(i1 + 1).map(([x2, y2], i2) => {
        return {
          d: (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1),
          t1: i1,
          t2: i1 + 1 + i2,
        };
      });
    })
    .filter(({ d }) => 25_413_024 < d && d < 3_005_632_832) //  && d <= 105_165_982);
    .toSorted(({ d: da }, { d: db }) => db - da);

  for (const { d, t1, t2 } of areas) {
    const [x1, y1] = tiles[t1];
    const [x2, y2] = tiles[t2];
    console.log("Checking", d, t1, t2);
    let valid = true;
    let checkCount = 0;
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
      if (
        !isPointInPolygon(i, y1, tiles as [number, number][]) ||
        !isPointInPolygon(i, y2, tiles as [number, number][])
      ) {
        valid = false;
        break;
      }
    }
    if (!valid) {
      continue;
    }
    for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
      if (
        !isPointInPolygon(x1, j, tiles as [number, number][]) ||
        !isPointInPolygon(x2, j, tiles as [number, number][])
      ) {
        valid = false;
        break;
      }
    }
    if (valid) {
      return d;
    }
  }
  // return areas[0];
};

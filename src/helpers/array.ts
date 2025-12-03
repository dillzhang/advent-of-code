export const range = (length: number) => {
  return [...Array(length).keys()];
};

export const to2DArray = (input: string[], delimiter = ""): string[][] => {
  return input.map((line) => line.split(delimiter));
};

export const map2d = <T, U>(input: T[][], transform: (cell: T) => U): U[][] => {
  return input.map((row) => row.map((cell) => transform(cell)));
};

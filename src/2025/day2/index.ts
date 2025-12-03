import { splitByLength } from "../../helpers/strings";

export default async (input: string[]) => {
  let sum = 0;
  const ranges = input[0].split(",");
  for (const range of ranges) {
    const [start, end] = range.split("-").map((i) => parseInt(i));

    for (let i = start; i < end + 1; i++) {
      const stringVersion = String(i);
      const length = stringVersion.length;
      for (let j = 1; j < length; j++) {
        if (length % j !== 0) {
          continue;
        }
        const slice = stringVersion.slice(0, j);
        if (
          splitByLength(stringVersion, j).every(
            (substring) => substring === slice
          )
        ) {
          sum += i;
          break;
        }
      }
    }
  }

  return sum;
};

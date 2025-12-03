import { range } from "./array";

export const splitByLength = (input: string, desiredLength: number) => {
  const count = Math.ceil(input.length / desiredLength);
  return range(count).map((key) => {
    return input.slice(desiredLength * key, desiredLength * (key + 1));
  });
};

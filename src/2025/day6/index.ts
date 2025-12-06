import { range } from "../../helpers/array";

export default async (input: string[]) => {
  const operationString = input.at(-1)!;
  const operations = [operationString[0]!];
  const maxLengths: number[] = [];
  let prev = 0;
  for (let i = 1; i < operationString.length; i++) {
    if (operationString[i] !== " ") {
      operations.push(operationString[i]);
      maxLengths.push(i - prev);
      prev = i;
    }
  }
  maxLengths.push(Math.max(...input.map((i) => i.length)) - prev + 1);
  const numberStarts = maxLengths.map((_, index) => {
    return maxLengths.slice(0, index).reduce((acc, cur) => acc + cur, 0);
  });

  const numberStrings = input.slice(0, -1).map((row) => {
    return numberStarts.map((start, numberIndex) => {
      return row.slice(start, start + maxLengths[numberIndex]);
    });
  });
  const verticalNumbers = maxLengths.map((length, index) => {
    return range(length)
      .map((len) => {
        return parseInt(
          numberStrings
            .map((line) => {
              const value = line[index].padStart(length).at(len) ?? " ";
              return value === " " ? "" : value;
            })
            .reduce((acc, cur) => acc + cur, "")
        );
      })
      .filter((a) => !isNaN(a));
  });

  return operations
    .map((op, index) => {
      switch (op) {
        case "*":
          return verticalNumbers[index].reduce((acc, cur) => {
            return acc * cur;
          }, 1);
        default:
          return verticalNumbers[index].reduce((acc, cur) => {
            return acc + cur;
          }, 0);
      }
    })
    .reduce((acc: number, cur) => {
      return acc + cur;
    }, 0);
};

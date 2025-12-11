const getPathsBetween = (
  outputs: Record<string, string[]>,
  node: string,
  requiredVisits: string[] = [],
  seen: number = 0,
  memo: Record<string, number> = {}
): number => {
  if (node === "out") {
    console.log(
      seen,
      2 ** requiredVisits.length - 1,
      seen === 2 ** requiredVisits.length - 1
    );
    return seen === 2 ** requiredVisits.length - 1 ? 1 : 0;
  }

  const key = `${node}-${seen}`;
  if (memo[key] !== undefined) {
    return memo[key];
  }

  const requiredIndex = requiredVisits.findIndex((n) => n === node);

  if (requiredIndex >= 0) {
    seen += 2 ** requiredIndex;
  }

  const result = (outputs[node] ?? [])
    .map((n) => {
      return getPathsBetween(outputs, n, requiredVisits, seen, memo);
    })
    .reduce((acc, cur) => acc + cur, 0);

  memo[key] = result;

  return result;
};

export default async (input: string[]) => {
  const outputs = Object.fromEntries(
    input.map((line) => {
      const [server, outputs] = line.split(": ");
      return [server, outputs.split(" ")];
    })
  );
  // return getPathsBetween(outputs, "you");
  return getPathsBetween(outputs, "svr", ["dac", "fft"]);
};

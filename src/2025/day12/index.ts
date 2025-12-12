export default async (input: string[]) => {
  const file = input.join("\n");
  const components = file.split("\n\n");
  const presents = components.slice(0, -1).map((present) => {
    const shape = present
      .split("\n")
      .slice(1)
      .map((row) => row.split("").map((i) => i === "#"));
    const cells = present.split("").filter((i) => i === "#").length;
    return { shape, cells };
  });
  const trees = components
    .at(-1)!
    .split("\n")
    .map((tree) => {
      const [dimensions, presents] = tree.split(": ");
      const [width, height] = dimensions.split("x").map((i) => parseInt(i));
      const presentCounts = presents.split(" ").map((i) => parseInt(i));

      return { width, height, presentCounts };
    });

  return trees.filter(({ width, height, presentCounts }) => {
    const { totalPresents, totalCells } = presentCounts.reduce(
      (acc, cur, index) => {
        const { cells } = presents[index];
        acc.totalPresents += cur;
        acc.totalCells += cur * cells;
        return acc;
      },
      { totalPresents: 0, totalCells: 0 }
    );

    const area = width * height;
    if (totalCells > area) {
      return false;
    }

    if (totalPresents <= Math.floor(width / 3) * Math.floor(height / 3)) {
      return true;
    }

    return false;
  }).length;
};

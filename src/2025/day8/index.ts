const CONNECTION_COUNT = 1000;

export default async (input: string[]) => {
  const junctions = input.map((line) =>
    line.split(",").map((i) => parseInt(i, 10))
  );

  const distances = junctions
    .flatMap(([x1, y1, z1], j1) => {
      return junctions.slice(j1 + 1).map(([x2, y2, z2], index2) => {
        const j2 = j1 + 1 + index2;
        return {
          distance: (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2,
          j1,
          j2,
        };
      });
    })
    .toSorted((a, b) => a.distance - b.distance);
  // .slice(0, CONNECTION_COUNT);

  const circuits: { [x: number]: number } = {};
  let circuitCount = 1;

  for (const { j1, j2 } of distances) {
    const circuit1 = circuits[j1];
    const circuit2 = circuits[j2];
    if (circuit1 && circuit2) {
      const circuit = Math.min(circuit1, circuit2);
      Object.entries(circuits).forEach(([k, v]) => {
        if (v === circuit1 || v === circuit2) {
          circuits[k as any] = circuit;
        }
      });
    } else if (circuit1) {
      circuits[j2] = circuit1;
    } else if (circuit2) {
      circuits[j1] = circuit2;
    } else {
      circuits[j1] = circuitCount;
      circuits[j2] = circuitCount;
      circuitCount++;
    }
    if (
      (circuit1 === 1 || circuit2 === 1) &&
      Object.values(circuits).length === junctions.length &&
      Object.values(circuits).every((v) => v === 1)
    ) {
      return junctions[j1][0] * junctions[j2][0];
    }
  }

  // const circuitSizes = Object.values(circuits).reduce((acc, v) => {
  //   if (acc[v] === undefined) {
  //     acc[v] = 0;
  //   }
  //   acc[v] += 1;
  //   return acc;
  // }, {} as { [x: number]: number });

  // return Object.values(circuitSizes)
  //   .toSorted((a, b) => b - a)
  //   .slice(0, 3)
  //   .reduce((acc, cur) => acc * cur, 1);
};

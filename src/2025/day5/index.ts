// export default async (input: string[]) => {
//   const splitIndex = input.findIndex((line) => line === "");
//   const ranges = input.slice(0, splitIndex).map((range) => {
//     return range.split("-").map((i) => parseInt(i));
//   });
//   const ids = input.slice(splitIndex + 1);

//   return ids.filter((id) => {
//     const int = parseInt(id);
//     return ranges.some(([start, stop]) => {
//       return start <= int && int <= stop;
//     });
//   }).length;
// };

export default async (input: string[]) => {
  const splitIndex = input.findIndex((line) => line === "");
  const ranges = input
    .slice(0, splitIndex)
    .map((range) => {
      return range.split("-").map((i) => parseInt(i));
    })
    .sort(([startA], [startB]) => {
      return startA - startB;
    });
  let largestFresh = -1;
  let freshCount = 0;

  ranges.forEach(([start, stop]) => {
    const actualStart = Math.max(largestFresh + 1, start);
    if (actualStart <= stop) {
      freshCount += stop - actualStart + 1;
      largestFresh = stop;
    }
  });
  return freshCount;
};

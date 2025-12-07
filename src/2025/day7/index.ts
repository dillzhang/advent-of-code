// export default async (input: string[]) => {
//   const beams = Array(input[0].length).fill(".");
//   let splits = 0;
//   input.forEach((level) => {
//     level.split("").forEach((cell, index) => {
//       switch (cell) {
//         case "S":
//           beams[index] = "|";
//           break;
//         case "^": {
//           if (beams[index] === "|") {
//             beams[index - 1] = "|";
//             beams[index] = ".";
//             beams[index + 1] = "|";
//             splits += 1;
//           }
//           break;
//         }
//       }
//     });
//   });
//   return splits;
// };

export default async (input: string[]) => {
  const beams = Array(input[0].length).fill(0);
  input.forEach((level) => {
    level.split("").forEach((cell, index) => {
      switch (cell) {
        case "S":
          beams[index] = 1;
          break;
        case "^": {
          if (beams[index] > 0) {
            beams[index - 1] += beams[index];
            beams[index + 1] += beams[index];
            beams[index] = 0;
          }
          break;
        }
      }
    });
  });
  return beams.reduce((acc, cur) => acc + cur, 0);
};

import { range } from "../../helpers/array";

export default async (input: string[]) => {
  return input
    .map((line) => {
      const components = line.split(" ");
      // const indicators = components
      //   .at(0)!
      //   .slice(1, -1)
      //   .split("")
      //   .map((i) => {
      //     return i === "#" ? 1 : 0;
      //   });
      const joltages = components
        .at(-1)!
        .slice(1, -1)
        .split(",")
        .map((i) => parseInt(i));
      const buttons = components.slice(1, -1).map((button) => {
        return button
          .slice(1, -1)
          .split(",")
          .map((i) => parseInt(i));
      });

      // return range(2 ** buttons.length)
      //   .map((i) => {
      //     if (i === 0) {
      //       return Number.MAX_SAFE_INTEGER;
      //     }
      //     const binaryString = i
      //       .toString(2)
      //       .padStart(buttons.length, "0")
      //       .split("");

      //     const result = binaryString
      //       .reduce((acc, bit, index) => {
      //         if (bit === "1") {
      //           buttons[index].forEach((toggle) => {
      //             acc[toggle] += 1;
      //           });
      //         }
      //         return acc;
      //       }, Array(indicators.length).fill(0))
      //       .every((toggle, i) => toggle % 2 === indicators[i]);

      //     if (result) {
      //       return binaryString.filter((i) => i === "1").length;
      //     }
      //     return Number.MAX_SAFE_INTEGER;
      //   })
      //   .reduce((acc, cur) => Math.min(acc, cur), Number.MAX_SAFE_INTEGER);

      const seen = new Set();
      const frontier = [{ presses: 0, jolts: [...joltages] }];

      while (frontier.length > 0) {
        const { presses: prevPresses, jolts } = frontier.shift()!;
        if (jolts.every((jolt) => jolt === 0)) {
          return prevPresses;
        }

        const presses = prevPresses + 1;

        buttons.forEach((button) => {
          const newJolts = button.reduce(
            (acc, i) => {
              acc[i] -= 1;
              return acc;
            },
            [...jolts]
          );

          const joltString = newJolts.join(",");
          if (seen.has(joltString)) {
            return;
          }
          seen.add(joltString);

          if (newJolts.every((jolt) => jolt >= 0)) {
            frontier.push({ presses, jolts: newJolts });
          }
        });
      }
      throw new Error("No Solution Found");
    })
    .reduce((acc, cur) => {
      // console.log(cur);
      return acc + cur;
    }, 0);
};

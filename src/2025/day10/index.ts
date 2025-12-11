// import { range } from "../../helpers/array";
const { init } = require("z3-solver");

export default async (input: string[]) => {
  return (
    await Promise.all(
      input.map(async (line, lineNumber) => {
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

        const { Context } = await init();
        const { Optimize, Int } = new Context("test");
        const solver = new Optimize();

        const buttons = components.slice(1, -1).map((button) => {
          const presses = Int.const(button);
          solver.add(presses.ge(0));

          return {
            effected: new Set(
              button
                .slice(1, -1)
                .split(",")
                .map((i) => parseInt(i))
            ),
            presses,
          };
        });

        joltages.forEach((joltage, joltIndex) => {
          const sum = buttons
            .filter(({ effected }) => {
              return effected.has(joltIndex);
            })
            .map(({ presses }) => presses)
            .reduce((acc, cur) => {
              return acc.add(cur);
            });
          solver.add(sum.eq(joltage));
        });

        const sum = buttons
          .map(({ presses }) => presses)
          .reduce((acc, cur) => {
            return acc.add(cur);
          });
        solver.minimize(sum);

        const isSat = await solver.check();
        if (isSat === "sat") {
          const model = solver.model();
          const pressCount = buttons.map(({ presses }) => {
            return parseInt(model.get(presses).toString(), 10);
          });
          return pressCount.reduce((acc, cur) => acc + cur, 0);
        }

        throw new Error("No Solution Found");
      })
    )
  ).reduce((acc, cur) => {
    return acc + cur;
  }, 0);
};

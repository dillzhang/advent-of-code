const BATTERY_COUNT = 12;

export default async (input: string[]) => {
  return input
    .map((bank) => {
      let jolts = bank.split("").map((battery) => parseInt(battery));
      const output = [];
      for (let batteryNum = 1; batteryNum <= BATTERY_COUNT; batteryNum++) {
        const { value, index } = jolts
          .slice(0, jolts.length - (BATTERY_COUNT - batteryNum))
          .reduce(
            (acc, cur, index) => {
              if (cur > acc.value) {
                return { value: cur, index };
              }
              return acc;
            },
            { value: 0, index: 0 }
          );
        output.push(value);
        jolts = jolts.slice(index + 1);
      }
      return parseInt(output.map((battery) => String(battery)).join(""));
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
};

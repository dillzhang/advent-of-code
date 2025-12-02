export default async (input: string[]) => {
  let sum = 0;
  const ranges = input[0].split(",");
  for (const range of ranges) {
    const [start, end] = range.split("-").map((i) => parseInt(i));

    for (let i = start; i < end + 1; i++) {
      const stringVersion = String(i);
      const length = stringVersion.length;
      for (let j = 1; j < length; j++) {
        if (length % j !== 0) {
          continue;
        }
        let success = true;
        const slice = stringVersion.slice(0, j);
        for (let k = 0; k < length; k += j) {
          // console.log(i, j, k);
          if (stringVersion.slice(k, k + j) !== slice) {
            success = false;
            break;
          }
        }
        if (success) {
          sum += i;
          break;
        }
      }
    }
  }

  console.log(sum);
};

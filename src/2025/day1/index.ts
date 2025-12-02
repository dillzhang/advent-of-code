export default async (input: string[]) => {
  const log = [];
  let zeroCount = 0;
  let position = 50;

  for (const line of input) {
    const direction = line.slice(0, 1);
    let amount = parseInt(line.slice(1));
    const logInfo = {
      startPosition: position,
      startCount: zeroCount,
      delta: line,
      endPosition: position,
      endCount: zeroCount,
    };

    zeroCount += Math.floor(amount / 100);
    amount = amount % 100;

    switch (direction) {
      case "R":
        position += amount;

        if (position >= 100) {
          zeroCount += 1;
          position = position % 100;
        }
        break;
      case "L":
        if (position === 0) {
          position += 100;
        }

        position -= amount;

        while (position < 0) {
          zeroCount += 1;
          position += 100;
        }

        if (position === 0) {
          zeroCount += 1;
        }

        break;
    }

    logInfo.endPosition = position;
    logInfo.endCount = zeroCount;

    log.push(logInfo);
  }
  console.table(log);
  console.log("zeroCount", zeroCount);
};

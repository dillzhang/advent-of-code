import { readFile } from "./helpers/input";

const FUNCTION_RUNTIME_ID = "Function Runtime";

const importAndRun = async (year: string, day: string, isSample: boolean) => {
  const directory = `${year}/day${day}`;
  const module = await import(`./${directory}/index.ts`);
  const funct = module.default as (input: string[]) => Promise<void>;

  const input = isSample
    ? `src/${directory}/sample.txt`
    : `src/${directory}/input.txt`;
  const content = await readFile(input);

  console.log(`Running code for day ${day} on ${isSample ? "sample" : "code"}`);
  console.time(FUNCTION_RUNTIME_ID);
  await funct(content);
  console.timeEnd(FUNCTION_RUNTIME_ID);
};

const YEAR_PREFIX = "--year=";
const DAY_PREFIX = "day=";
const SAMPLE = "sample";

const args = process.argv;

const year =
  args.find((s) => s.startsWith(YEAR_PREFIX))?.slice(YEAR_PREFIX.length) ??
  "2025";

const day = args
  .find((s) => s.startsWith(DAY_PREFIX))
  ?.slice(DAY_PREFIX.length);

if (!day) {
  throw new Error("Must specify day=<#>");
}

const sample = args.find((s) => s === SAMPLE);

importAndRun(year, day, Boolean(sample));

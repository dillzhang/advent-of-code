import { readFileSync } from "fs";

export const readFile = async (path: string): Promise<string[]> => {
  return readFileSync(path, "utf-8").trim().split("\n");
};

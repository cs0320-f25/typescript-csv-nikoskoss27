import * as fs from "fs";
import * as readline from "readline";
import { z } from "zod";

/**
 * Parses a CSV file located at `path`. If a ZodSchema is provided, the output will be an array of parsed objects conforming to that schema; otherwise, it yields a 2D array of strings.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
export async function parseCSV<T>(schema: z.ZodSchema<T> | undefined, path: string): Promise<T[] | string[][]> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // Create an empty array to hold the results
  let result = []
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  for await (const line of rl) {
    const values = line.split(",").map((v) => v.trim());
    result.push(values)
  }

  // If no schema is provided, return 2D array of strings.
  if (!schema) return result;

  // Create an array to hold the parsed data.
  const parsedData: T[] = [];

  // Validate and parse each row according to the provided schema.
  for (const row of result) {
    const validation = schema.safeParse(row);
    if (validation.success === false) {
      throw new Error(`Row not valid: ${JSON.stringify(row)}`);
    }
    const parsedRow = validation.data;
    parsedData.push(parsedRow);
  }
  return parsedData;
  
}
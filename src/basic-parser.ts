import * as fs from "fs";
import * as readline from "readline";
import { z } from "zod";

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
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

  if (!schema) return result;

  const parsedData: T[] = [];

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


export const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
                         .transform( tup => ({name: tup[0], age: tup[1]}))



/*
Name,Credits,Email
Nikos Koss,8,nikos@example.com
*/

const studentRowSchema = z.tuple([z.string(), z.coerce.number(), z.email()]).transform( arr => ({
  name: arr[0],
  credits: arr[1],
  email: arr[2]
}) );


type StudentRow = z.infer<typeof studentRowSchema>;


const studentResult = studentRowSchema.safeParse(["Nikos Koss", "8", "nikos@example.com"]);
const student: StudentRow | undefined = studentResult.data

// if(student !== undefined) {
//   console.log(student[0])
// }

// if(studentResult.success) {
//   console.log(student[0])
// }



const jsonString = `{
  "name": "Nikos Koss",
  "credits": "8",
  "email": "nikos@example.com"
}`;

const nikos = JSON.parse(jsonString);

nikos.name
nikos.age = "20";
nikos.credits = 8

console.log(nikos.name.size)


// use zod to fix removing "any" type without validation
const nikosSchema = z.object({
  name: z.string(),
  age: z.string(),
  credits: z.string(),
  email: z.string()
});

nikosSchema.safeParse(nikos);


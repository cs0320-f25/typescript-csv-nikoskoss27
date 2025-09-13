import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const ANCESTRY_CSV_PATH = path.join(__dirname, "../data/ancestry.csv");
const STUDENTS_CSV_PATH = path.join(__dirname, "../data/students.csv");
const RESIDENCE_CSV_PATH = path.join(__dirname, "../data/residence.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(undefined, PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(undefined, PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV handles no column headers", async () => {
  const results = await parseCSV(undefined, ANCESTRY_CSV_PATH)
  
  expect(results[0]).toEqual(["Ben", "German"]);
});

test("parseCSV handles column headers", async () => {
  const results = await parseCSV(undefined, PEOPLE_CSV_PATH)
  
  expect(results[0]).toEqual(["Alice", "23"]);
  expect(results[1]).toEqual(["Bob", "thirty"]);
  expect(results[2]).toEqual(["Charlie", "25"]);
  expect(results[3]).toEqual(["Nim", "22"]);
});

test("parseCSV handles commas in data", async () => {
  const results = await parseCSV(undefined, ANCESTRY_CSV_PATH)
  
  expect(results[2]).toEqual(["Christina", "French, Japanese, Chinese"]);
});

test("parseCSV handles schemas", async () => {
  const personSchema = z.object({name: z.string(), year: z.number()});
  const results = await parseCSV(personSchema, STUDENTS_CSV_PATH);
  
  expect(results[0]).toEqual([{name: "Mason", year: 2028}]);
  expect(results[1]).toEqual([{name: "Cecilia", year: 2027}]);
  expect(results[2]).toEqual([{name: "Katerina", year: 2026}]);
});

test("parseCSV converts strings to numbers when schema is provided", async () => {
  const results = await parseCSV(undefined, RESIDENCE_CSV_PATH);
  const residenceSchema = z.object({name: z.string(), residence: z.string(), floor: z.number()});

  expect(results[0]).toEqual({name: "Alice", residence: "Perkins", floor: 5});
});
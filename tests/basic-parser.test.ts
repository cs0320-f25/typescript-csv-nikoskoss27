import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const ANCESTRY_CSV_PATH = path.join(__dirname, "../data/ancestry.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV handles no column headers", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results[0]).toEqual(["Ben", "German"]);
});

test("parseCSV handles column headers", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results[0]).toEqual(["Alice", "23"]);
  expect(results[1]).toEqual(["Bob", "thirty"]);
  expect(results[2]).toEqual(["Charlie", "25"]);
  expect(results[3]).toEqual(["Nim", "22"]);
});

test("parseCSV handles commas in data", async () => {
  const results = await parseCSV(ANCESTRY_CSV_PATH)
  
  expect(results[2]).toEqual(["Christina", "French, Japanese, Chinese"]);
});


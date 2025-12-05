import { expect } from "@std/expect";
import {
  buildMultiplicationGrid,
  formatMultiplicationTable,
} from "./multiplication_table.ts";

Deno.test("buildMultiplicationGrid computes correct products", () => {
  const nums = [1, 2, 3];
  const grid = buildMultiplicationGrid(nums);
  expect(grid).toEqual([
    [1, 2, 3],
    [2, 4, 6],
    [3, 6, 9],
  ]);
});

Deno.test("formatMultiplicationTable aligns columns consistently", () => {
  const nums = [2, 10];
  const grid = buildMultiplicationGrid(nums);
  const out = formatMultiplicationTable(nums, grid);
  const lines = out.split("\n");
  // header, separator, two data rows
  expect(lines.length).toBe(4);
  // verify separator length equals header length
  expect(lines[1].length).toBe(lines[0].length);
  // verify header and data rows end with column separator
  expect(lines[0].endsWith("|")).toBe(true);
  expect(lines[2].endsWith("|")).toBe(true);
  expect(lines[3].endsWith("|")).toBe(true);
});

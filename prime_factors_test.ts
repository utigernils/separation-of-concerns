import { expect } from "@std/expect";
import { primesUpTo, factorOne, factor } from "./prime_factors.ts";

Deno.test("primesUpTo generates primes correctly", () => {
  expect(primesUpTo(1)).toEqual([]);
  expect(primesUpTo(10)).toEqual([2, 3, 5, 7]);
});

Deno.test("factorOne handles basic cases", () => {
  expect(factorOne(1)).toEqual([1]);
  expect(factorOne(10)).toEqual([2, 5]);
  expect(factorOne(42)).toEqual([2, 3, 7]);
  expect(factorOne(99)).toEqual([3, 3, 11]);
  expect(factorOne(1024)).toEqual(new Array(10).fill(2));
});

Deno.test("factor maps inputs to their factors", () => {
  const m = factor([10, 55]);
  expect(m.get(10)).toEqual([2, 5]);
  expect(m.get(55)).toEqual([5, 11]);
});

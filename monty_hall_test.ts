import { expect } from "@std/expect";
import { simulate, RNG } from "./monty_hall.ts";

Deno.test("simulate counts wins with deterministic RNG", () => {
  // Deterministic RNG cycling through values to cover doors uniformly
  const values = [0, 0.3, 0.6, 0.9];
  let idx = 0;
  const rng: RNG = () => {
    const v = values[idx % values.length];
    idx++;
    return v;
  };
  const { times, wonSticking, wonChanging } = simulate(1000, rng);
  expect(times).toBe(1000);
  // Switching should win at least as often as sticking in Monty Hall
  expect(wonChanging).toBeGreaterThanOrEqual(wonSticking);
});

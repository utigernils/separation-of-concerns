export type RNG = () => number;

// Pure simulation: returns counts of wins for sticking vs switching
export function simulate(times: number, rng: RNG = Math.random) {
  if (times < 0) {
    throw new Error("cannot play a negative number of times");
  }
  let wonSticking = 0;
  let wonChanging = 0;
  for (let i = 0; i < times; i++) {
    const doorsWithPrize: Map<number, boolean> = new Map([
      [1, false],
      [2, false],
      [3, false],
    ]);
    const winningDoor = Math.floor(rng() * 3) + 1;
    doorsWithPrize.set(winningDoor, true);

    const playerGuess = Math.floor(rng() * 3) + 1;

    const losingDoor = [...doorsWithPrize.keys()].find(
      (d) => d !== winningDoor && d !== playerGuess,
    )!;

    const winsSticking = doorsWithPrize.get(playerGuess);
    const otherDoor: number = [...doorsWithPrize.keys()].filter(
      (d) => d !== losingDoor && d !== playerGuess,
    )[0];
    const winsChanging = doorsWithPrize.get(otherDoor);
    if (winsSticking) {
      wonSticking++;
    } else if (winsChanging) {
      wonChanging++;
    }
  }
  return { times, wonSticking, wonChanging };
}

// Formatting/printing kept at the boundary
export function play(times: number) {
  const { wonSticking, wonChanging } = simulate(times);
  console.log(`played ${times} times`);
  console.log(`won ${wonSticking} times by sticking to the initial choice`);
  console.log(`won ${wonChanging} times by changing the initial choice`);
  const f = Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  console.log(`sticking wins ${f.format((wonSticking / times) * 100)}% of games`);
  console.log(`changing wins ${f.format((wonChanging / times) * 100)}% of games`);
}

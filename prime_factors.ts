// Generate primes up to `n` using the Sieve of Eratosthenes
export function primesUpTo(n: number): number[] {
  if (n < 2) return [];
  const sieve = new Array<boolean>(n + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  for (let p = 2; p * p <= n; p++) {
    if (sieve[p]) {
      for (let m = p * p; m <= n; m += p) sieve[m] = false;
    }
  }
  const primes: number[] = [];
  for (let i = 2; i <= n; i++) if (sieve[i]) primes.push(i);
  return primes;
}

// Factor a single positive integer into its prime factors
export function factorOne(n: number): number[] {
  if (n < 1) throw new Error("negative numbers are not supported");
  if (n === 1) return [1];
  const primes = primesUpTo(Math.floor(Math.sqrt(n)) + 1);
  const factors: number[] = [];
  let remainder = n;
  for (const p of primes) {
    while (remainder % p === 0) {
      factors.push(p);
      remainder = Math.floor(remainder / p);
    }
    if (remainder === 1) break;
  }
  if (remainder > 1) factors.push(remainder);
  return factors;
}

// Pure function: returns mapping of each input number to its prime factors
export function factor(numbers: Array<number>): Map<number, number[]> {
  const result = new Map<number, number[]>();
  for (const n of numbers) {
    result.set(n, factorOne(n));
  }
  return result;
}

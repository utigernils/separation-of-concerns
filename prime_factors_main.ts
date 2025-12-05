import { factor } from "./prime_factors.ts";

const input = [42, 99, 1234];
const result = factor(input);
for (const n of input) {
	console.log(`${n}: ${result.get(n)?.join(", ")}`);
}

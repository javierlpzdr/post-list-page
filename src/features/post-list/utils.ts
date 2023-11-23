export const isPrimeNumber = (n: number) =>
  Math.abs(n) <= 3 || (n - 1) % 6 == 0 || (n + 1) % 6 == 0;
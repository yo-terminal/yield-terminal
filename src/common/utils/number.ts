export function round(x: number, n: number = 0): number {
  const m = 10 ** n;
  return Math.round(x * m) / m;
}
export function round(x: number, n: number = 0): number {
  const m = 10 ** n;
  return Math.round(x * m) / m;
}

export function trunc(x: number, n: number = 0): number {
  const m = 10 ** n;
  return Math.trunc(x * m) / m;
}
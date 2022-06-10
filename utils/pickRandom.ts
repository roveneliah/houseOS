export const pickRandom =
  (n: number) =>
  (arr: Array<any>): Array<any> =>
    arr.filter(() => Math.random() < n);

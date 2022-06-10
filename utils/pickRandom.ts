export const pickRandom =
  (n: number) =>
  (arr: Array<any>): Array<any> =>
    arr.filter(() => Math.random() < 0.5);

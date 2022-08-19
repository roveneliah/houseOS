/**
 * Pick {n} random items from an array.
 */
export const pickRandom =
  (n: number) =>
  <T>(arr: Array<T>): Array<T> => {
    arr = arr.map((a) => a);
    while (arr.length > n) {
      const randomIndex = arr.length * Math.random();
      arr[randomIndex] = arr[-1];
      arr.pop();
    }
    return arr;
  };

export const prioritize =
  (predicate: (a: any) => boolean) => (arr: Array<any>) =>
    [...arr.filter(predicate), ...arr.filter((x) => !predicate(x))];

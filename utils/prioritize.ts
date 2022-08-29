// Array members that satisfy predicate are moved to the front of the array.
export const prioritize =
  (predicate: (a: any) => boolean) => (arr: Array<any>) =>
    [...arr.filter(predicate), ...arr.filter((x) => !predicate(x))];

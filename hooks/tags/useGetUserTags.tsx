const pickRandom =
  (n: number) =>
  (arr: Array<any>): Array<any> =>
    arr.filter(() => Math.random() < 0.5);

export const useGetUserTags = (userId: string) => {
  return pickRandom(3)([
    "Steward",
    "Contributor",
    "Full-Time",
    "Media Team",
    "Dev Team",
    "Pig Pen",
  ]);
};

import { concat, reduce } from "ramda";

export const concatAll = (...arr: Array<any>) => arr.reduce(concat, []);

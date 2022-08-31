import { length } from "ramda";
import { useState } from "react";

export const prev = (arr: Array<any>) => (currentIndex: number) =>
  (currentIndex + length(arr) - 1) % length(arr);
export const next = (arr: Array<any>) => (currentIndex: number) =>
  (currentIndex + 1) % length(arr);

export const useCycler = (arr: Array<any>, initIndex: number = 0) => {
  const [index, setIndex] = useState(initIndex);
  const nxt = () => setIndex(next(arr));
  const prv = () => setIndex(prev(arr));

  return {
    index,
    nxt,
    prv,
  };
};

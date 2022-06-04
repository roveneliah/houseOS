import { useState } from "react";

type Option = {
  name: string;
  onClick: Function;
};

export const useSingleSelect = (arr: Array<Option>) => {
  const [selected, setSelected] = useState(arr.map(() => false));
  const toggle = (index: number) =>
    setSelected((s) => s.map((val, i) => i === index && !val));
  return arr.map((x, i) => ({
    ...x,
    selected: selected[i],
    toggle: () => {
      toggle(i);
      x.onClick && x.onClick();
    },
  }));
};

import { useState } from "react";

type Option = {
  name: string;
  onClick?: Function;
  icon?: any;
};

export const useSingleSelect = (arr: Array<Option>, initial: number = 0) => {
  const [selected, setSelected] = useState(
    arr.map((_, i: number) => i === initial)
  );
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

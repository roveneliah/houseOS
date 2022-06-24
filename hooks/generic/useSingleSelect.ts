import { useState } from "react";

type Option = {
  name: string;
  onClick?: Function;
  icon?: any;
};

export const useSingleSelect = (arr: Array<Option>) => {
  const [selected, setSelected] = useState<number>(0);

  const options = arr.map((x, i) => ({
    ...x,
    selected: i === selected,
    toggle: () => {
      setSelected(i);
      x.onClick && x.onClick();
    },
  }));

  const next = () => setSelected((i: number) => (i + 1) % arr.length);
  const prev = () =>
    setSelected((i: number) => (i + arr.length - 1) % arr.length);

  return {
    options,
    selected,
    next,
    prev,
  };
};

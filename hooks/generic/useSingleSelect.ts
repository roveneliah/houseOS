import { useState } from "react";

type Option = {
  name: string;
  onClick?: Function;
  icon?: any;
};

export const useSingleSelect = (
  arr: Array<Option>,
  initialIndex: number = 0
) => {
  const [selected, setSelected] = useState<number>(initialIndex);

  // Add selected (boolean), and a toggle function to option.
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
    selectedName: arr[selected].name,
    next,
    prev,
  };
};

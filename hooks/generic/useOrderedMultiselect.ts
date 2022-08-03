import { useState } from "react";
import { prioritize } from "../../utils/prioritize";

/**
 * List selected elements before unselected ones.
 */
export const useOrderedMultiselect = (arr: Array<any>): Array<any> => {
  const [selected, setSelected] = useState(arr.map(() => false));
  const toggle = (index: number) => () => {
    setSelected((s) => s.map((val, i) => (i === index ? !val : val)));
  };

  return prioritize((x) => !!x.selected)(
    arr.map((x, i) => ({
      x,
      selected: selected[i],
      toggle: toggle(i),
    }))
  );
};

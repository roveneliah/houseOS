import { useState } from "react";

const prioritize = (predicate: (a: any) => boolean) => (arr: Array<any>) =>
  [...arr.filter(predicate), ...arr.filter((x) => !predicate(x))];

const useOrderedMultiselect = (arr: Array<any>): Array<any> => {
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

export default function TagSelector({ tags }: any) {
  const enhancedTags = useOrderedMultiselect(tags); // (1) selected first, (2) tag selected, (3) expose toggle
  console.log(enhancedTags);

  return (
    <div className="flex flex-row justify-start space-x-2 overflow-clip overflow-x-auto">
      {enhancedTags.map(({ x, selected, toggle }: any) => (
        <>
          <p className={`badge ${selected && "badge-dark"}`} onClick={toggle}>
            {x}
          </p>
        </>
      ))}
      <p className={`badge`} onClick={() => {}}>
        +
      </p>
    </div>
  );
}

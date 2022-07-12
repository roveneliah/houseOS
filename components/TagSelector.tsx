import { prop } from "ramda";
import { useEffect, useMemo } from "react";
import { useOrderedMultiselect } from "../hooks/generic/useOrderedMultiselect";

export const prioritize =
  (predicate: (a: any) => boolean) => (arr: Array<any>) =>
    [...arr.filter(predicate), ...arr.filter((x) => !predicate(x))];

export default function TagSelector({ tags, setSelectedTags }: any) {
  const enhancedTags = useOrderedMultiselect(tags); // (1) selected first, (2) tag selected, (3) expose toggle
  const selectedTags = useMemo(() => {
    const selected = enhancedTags.filter(prop("selected")).map(prop("x"));
    return selected.length > 0 ? selected : [];
  }, [...enhancedTags.map((tag) => tag.selected)]);

  useEffect(() => {
    setSelectedTags(selectedTags);
  }, [selectedTags]);

  return (
    <div className="flex flex-row justify-start space-x-2 overflow-clip overflow-x-auto">
      {enhancedTags.map(({ x, selected, toggle }: any, i: number) => (
        <p
          className={`text-neutral hover:bg-neutral hover:text-primary-content border-neutral whitespace-nowrap rounded-full border px-3 py-1 text-sm ${
            selected ? "bg-neutral text-primary-content" : ""
          }`}
          onClick={toggle}
          key={i}
        >
          {x}
        </p>
      ))}
      {/* <p className={`badge`} onClick={() => {}}>
        +
      </p> */}
    </div>
  );
}

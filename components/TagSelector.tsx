import { prop } from "ramda";
import { useEffect, useMemo } from "react";
import { useOrderedMultiselect } from "../hooks/generic/useOrderedMultiselect";

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
    <div className="no-scrollbar flex flex-row justify-start space-x-2 overflow-clip overflow-x-auto">
      {enhancedTags.map(({ x, selected, toggle }: any, i: number) => (
        <p
          className={`hover:bg-base-content hover:text-base-100 border-base-content whitespace-nowrap rounded-full border px-3 py-1 text-xs ${
            selected ? "bg-base-content text-base-100" : "text-base-content"
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

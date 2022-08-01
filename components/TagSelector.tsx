import { prop, T } from "ramda";
import { useEffect, useMemo } from "react";
import { useOrderedMultiselect } from "../hooks/generic/useOrderedMultiselect";

export default function TagSelector({ tags, setSelectedTags, theme = 0 }: any) {
  const enhancedTags = useOrderedMultiselect(tags); // (1) selected first, (2) tag selected, (3) expose toggle
  const selectedTags = useMemo(() => {
    const selected = enhancedTags.filter(prop("selected")).map(prop("x"));
    return selected.length > 0 ? selected : [];
  }, [...enhancedTags.map((tag) => tag.selected)]);

  useEffect(() => {
    setSelectedTags(selectedTags);
  }, [selectedTags]);

  const themes = [
    {
      active: "border-warning text-warning border",
      inactive:
        "text-base-content hover:bg-base-100 border-base-content border",
    },
    {
      active: "bg-base-100 text-primary-content",
      inactive:
        "text-base-100 hover:bg-base-100 hover:text-base-100 border-base-100 border",
    },
  ];
  const { active, inactive } = themes[theme];

  return (
    <div className="no-scrollbar flex flex-row justify-start space-x-2 overflow-clip overflow-x-auto">
      {enhancedTags.map(({ x, selected, toggle }: any, i: number) => (
        <p
          className={`w-fit whitespace-nowrap rounded-full px-3 py-1 text-xs ${
            selected ? active : inactive
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

import { prop } from "ramda";
import { useEffect, useMemo } from "react";
import { useOrderedMultiselect } from "../../hooks/generic/useOrderedMultiselect";

const themes = [
  {
    active: "border-warning text-warning border",
    inactive: "text-base-content hover:bg-base-100 border-base-content border",
  },
  {
    active: "bg-base-100 text-primary-content",
    inactive:
      "text-base-100 hover:bg-base-100 hover:text-base-100 border-base-100 border",
  },
];

export default function TagSelector({ tags, setSelectedTags, theme = 0 }: any) {
  const enhancedTags = useOrderedMultiselect(tags);

  const selectedTags = useMemo(() => {
    const selected = enhancedTags.filter(prop("selected")).map(prop("x"));
    return selected.length > 0 ? selected : [];
  }, [...enhancedTags.map((tag) => tag.selected)]);

  useEffect(() => {
    setSelectedTags && setSelectedTags(selectedTags);
  }, [selectedTags]);

  const { active, inactive } = themes[theme];

  return enhancedTags.length > 0 ? (
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
    </div>
  ) : (
    <></>
  );
}

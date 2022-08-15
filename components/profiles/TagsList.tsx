import { useMemo } from "react";
import { Tag } from "@/types/Tag";

interface Props {
  tags: Array<Tag>;
  max?: number;
  disabled?: boolean;
  numbered?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  theme?: "light" | "dark";
}

export default function TagsList({
  tags,
  max = undefined,
  disabled = false,
  numbered = false,
  size = "md",
  theme = "light",
}: Props) {
  const sortedTags = useMemo(
    () => tags.sort((a: Tag, b: Tag) => b.taggers.length - a.taggers.length),
    [tags]
  );
  return (
    <div className="flex w-full cursor-default flex-row space-x-2 overflow-auto whitespace-nowrap">
      {sortedTags?.slice(0, max)?.map(
        (tag: any, i: number) =>
          tag.taggers.length > 0 && (
            <p
              className={`border ${
                theme === "light"
                  ? "bg-warning text-base-content border-none"
                  : "text-base-content border-base-content"
              } bg-base-content rounded-full px-3 py-1 text-${size} overflow-hidden ${
                !disabled && "hover:bg-gray-300"
              }`}
              key={i}
              onClick={!disabled ? tag.toggle : () => {}}
            >
              {numbered && (
                <span className="text-base-content mr-2 -ml-3 bg-gray-300 p-2">
                  {tag.taggers.length || ""}
                </span>
              )}
              {tag.tag}
            </p>
          )
      )}
    </div>
  );
}

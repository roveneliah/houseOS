import { useMemo } from "react";
import { Tag } from "@/types/Tag";

export default function TagsList({
  tags,
  max = undefined,
  disabled = false,
  numbered = true,
}: any) {
  const sortedTags = useMemo(
    () => tags.sort((a: Tag, b: Tag) => b.taggers.length - a.taggers.length),
    [tags]
  );
  return (
    <div className="flex flex-row space-x-2 overflow-auto">
      {sortedTags?.slice(0, max)?.map(
        (tag: any, i: number) =>
          tag.taggers.length > 0 && (
            <p
              className={`badge badge-light overflow-hidden text-gray-700 ${
                !disabled && "hover:bg-gray-300"
              }`}
              key={i}
              onClick={!disabled ? tag.toggle : () => {}}
            >
              {numbered && (
                <span className="mr-2 -ml-3 bg-gray-300 p-2 text-gray-700">
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

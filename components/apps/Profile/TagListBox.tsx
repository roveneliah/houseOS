import { useMemo } from "react";
import { Tag } from "@/types/Tag";

export default function TagListBox({
  address,
  tags,
  max = undefined,
  disabled = false,
  numbered = true,
  size = "md",
}: any) {
  const sortedTags = useMemo(
    () => tags?.sort((a: Tag, b: Tag) => b.taggers.length - a.taggers.length),
    [tags]
  );
  return (
    <div className="no-scrollbar flex w-full flex-row flex-wrap justify-start space-x-2 overflow-auto rounded-lg">
      {sortedTags
        .slice(0, max)
        .map(({ tag, taggers, toggle }: any, i: number) => (
          <p
            className={`my-2 whitespace-nowrap text-${size} rounded-full px-3 py-1 ${
              taggers.includes(address)
                ? "bg-warning text-neutral"
                : "text-base-200 bg-base-content hover:bg-warning hover:text-neutral"
            }`}
            key={i}
            onClick={!disabled ? toggle : () => {}}
          >
            {tag} {numbered && <span className="">• {taggers.length}</span>}
          </p>
        ))}
    </div>
  );
}

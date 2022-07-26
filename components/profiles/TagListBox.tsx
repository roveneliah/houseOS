import { useMemo } from "react";
import { Tag } from "../../types/Tag";

export default function TagListBox({
  address,
  tags,
  max = undefined,
  disabled = false,
  numbered = true,
}: any) {
  const sortedTags = useMemo(
    () => tags?.sort((a: Tag, b: Tag) => b.taggers.length - a.taggers.length),
    [tags]
  );
  return (
    <div className="no-scrollbar flex w-full flex-row justify-start space-x-2 overflow-auto rounded-lg">
      {sortedTags
        .slice(0, max)
        .map(({ tag, taggers, toggle }: any, i: number) => (
          <p
            className={`my-2 whitespace-nowrap rounded-full px-3 py-1 ${
              taggers.includes(address)
                ? "bg-warning text-neutral"
                : "text-warning border-warning hover:bg-warning hover:text-neutral border"
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

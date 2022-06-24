import { useMemo } from "react";
import { Tag } from "../../types/Tag";

export default function TagListBox({
  address,
  tags,
  max = undefined,
  disabled = false,
}: any) {
  const sortedTags = useMemo(
    () => tags?.sort((a: Tag, b: Tag) => b.taggers.length - a.taggers.length),
    [tags]
  );
  return (
    <div className="border-1 flex flex-row flex-wrap justify-start space-x-2 overflow-auto rounded-lg border  p-3">
      {sortedTags
        ?.slice(0, max)
        .map(({ tag, toggle, taggers }: any, i: number) => (
          <p
            className={`badge badge-lg my-1 ${
              taggers.includes(address) ? "badge-dark" : "hover:bg-gray-400"
            }`}
            key={i}
            onClick={!disabled ? toggle : () => {}}
          >
            {tag} {taggers.length}
          </p>
        ))}
    </div>
  );
}

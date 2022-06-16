export function TagListBox({ address, allTags }: any) {
  return (
    <div className="border-1 flex flex-row flex-wrap justify-start space-x-2 overflow-auto rounded-lg border  p-3">
      {allTags?.map(({ tag, toggle, taggers }: any, i: number) => (
        <p
          className={`badge my-1 ${
            taggers.includes(address) ? "badge-dark" : "hover:bg-gray-400"
          }`}
          key={i}
          onClick={toggle}
        >
          {tag} {taggers.length}
        </p>
      ))}
    </div>
  );
}

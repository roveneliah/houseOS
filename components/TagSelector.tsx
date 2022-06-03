import { useOrderedMultiselect } from "../hooks/useOrderedMultiselect";

export const prioritize =
  (predicate: (a: any) => boolean) => (arr: Array<any>) =>
    [...arr.filter(predicate), ...arr.filter((x) => !predicate(x))];

export default function TagSelector({ tags }: any) {
  const enhancedTags = useOrderedMultiselect(tags); // (1) selected first, (2) tag selected, (3) expose toggle

  return (
    <div className="flex flex-row justify-start space-x-2 overflow-clip overflow-x-auto">
      {enhancedTags.map(({ x, selected, toggle }: any) => (
        <>
          <p className={`badge ${selected && "badge-dark"}`} onClick={toggle}>
            {x}
          </p>
        </>
      ))}
      <p className={`badge`} onClick={() => {}}>
        +
      </p>
    </div>
  );
}

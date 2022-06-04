import { ClockIcon } from "./icons/ClockIcon";
import { Proposal } from "../types/Proposal";
import { useSingleSelect } from "../hooks/useSingleSelect";
import { LockedIcon } from "./icons/LockedIcon";
import { ListIcon } from "./icons/ListIcon";

export function StatusFilterTabs({
  proposals,
}: {
  proposals: Array<Proposal>;
}) {
  const options = useSingleSelect([
    { name: "Open", icon: ClockIcon },
    { name: "Closed", icon: LockedIcon },
    { name: "All", icon: ListIcon },
  ]);
  return (
    <div className="flex flex-row justify-between space-x-4">
      {options.map(({ name, icon, selected, toggle }: any) => (
        <div
          className={`flex w-[20vw] cursor-pointer flex-row justify-start space-y-4 rounded-t-lg p-5 text-gray-300 ${
            selected ? "bg-gray-500" : "bg-gray-700"
          }`}
          onClick={toggle}
        >
          {/* // TODO: generalize this to pass in these components */}
          <div className="flex w-full flex-row justify-start space-x-2">
            {icon()}
            <p className="font-semibold">{name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

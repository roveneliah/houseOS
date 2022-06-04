import { ClockIcon } from "./icons/ClockIcon";
import { Proposal } from "../types/Proposal";
import { useSingleSelect } from "../hooks/useSingleSelect";
import { LockedIcon } from "./icons/LockedIcon";
import { ListIcon } from "./icons/ListIcon";

interface Props {
  options: Array<{
    name: string;
    icon: SVGAElement;
    toggle: Function;
    selected: boolean;
  }>;
}

export function StatusFilterTabs({ options }: Props) {
  return (
    <div className="flex flex-row justify-between space-x-4">
      {options.map(({ name, icon, selected, toggle }: any) => (
        <div
          className={`flex w-[20vw] cursor-pointer flex-row justify-start space-y-4 rounded-t-lg p-5  ${
            selected ? "bg-gray-200 text-gray-800" : "bg-gray-700 text-gray-300"
          }`}
          onClick={toggle}
        >
          <div className="flex w-full flex-row justify-start space-x-2">
            {icon()}
            <p className="font-semibold">{name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

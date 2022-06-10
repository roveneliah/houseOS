import { StateFilters } from "../pages/proposals";

interface Props {
  options: Array<{
    name: string;
    icon: SVGAElement;
    toggle: Function;
    selected: StateFilters;
  }>;
  stateFilter: number;
  setStateFilter: Function;
}

export function StatusFilterTabs({ options, stateFilter }: Props) {
  return (
    <div className="flex flex-row justify-between space-x-4">
      {options.map(({ name, icon, toggle }: any, i: number) => (
        <div
          className={`flex w-[20vw] cursor-pointer flex-row justify-start space-y-4 rounded-t-lg p-5  ${
            i === stateFilter
              ? "bg-gray-200 text-gray-800"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={toggle}
          key={i}
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

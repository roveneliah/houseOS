interface Props {
  options: Array<{
    name: string;
    icon?: SVGAElement;
    onClick?: Function;
    selected: boolean;
  }>;
  stateFilter: number;
  setStateFilter: Function;
}

export default function StatusFilterTabs({ options, stateFilter }: Props) {
  return (
    <div className="flex flex-row justify-between space-x-4">
      {options.map(({ name, icon, onClick }: any, i: number) => (
        <div
          className={`flex w-[20vw] cursor-pointer flex-row justify-start space-y-4 rounded-t-lg p-4  ${
            i === stateFilter
              ? "bg-gray-200 text-gray-800"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={onClick}
          key={i}
        >
          <div className="flex w-full flex-row justify-start space-x-2">
            {icon && icon()}
            <p className="font-semibold">{name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

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
    <div className="flex w-full flex-row justify-between space-x-0 overflow-hidden rounded-t-lg border-b">
      {options.map(({ name, icon, onClick }: any, i: number) => (
        <div
          className={`flex w-full cursor-pointer flex-row justify-start space-y-4 p-4 px-6 pt-5 hover:bg-gray-100  ${
            i === stateFilter
              ? "bg-primary-content border-base-300 text-base-100 border-b-2"
              : "bg-primary-content text-base-100"
          }`}
          onClick={onClick}
          key={i}
        >
          <div className="flex w-full flex-row justify-start space-x-2">
            {icon && icon({})}
            <p className="font-semibold">{name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

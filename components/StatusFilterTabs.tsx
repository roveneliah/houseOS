interface Props {
  options: Array<{
    name: string;
    icon?: SVGAElement;
    onClick?: Function;
    selected: boolean;
  }>;
  stateFilter?: number;
  setStateFilter: Function;
}

export default function StatusFilterTabs({ options, stateFilter = 0 }: Props) {
  return (
    <div className="border-base-200 flex w-full flex-row justify-between space-x-0 overflow-hidden rounded-t-lg border-b">
      {options.map(({ name, icon, onClick }: any, i: number) => (
        <div
          className={`text-base-content bg-base-100 hover:bg-base-100 flex w-full cursor-pointer flex-row justify-start space-y-4 p-4 px-6 pt-5  ${
            i === stateFilter && "border-base-content border-b-2"
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

import AppFrame from "./AppFrame";

interface Props {
  title: string;
  list: Array<{
    name: string;
    description?: string;
    link?: string;
    onClick?: () => void;
  }>;
}

export default function ListFrame({ title, list }: Props) {
  return (
    <AppFrame>
      <div className="bg-base-100 flex h-full w-full flex-col space-y-4 p-8">
        <p className="text-2xl">{title}</p>
        <ul className="flex flex-col space-y-4">
          {list.map(({ name, description, onClick }) => (
            <li onClick={onClick}>
              <div className="flex flex-col items-start space-y-2 rounded-md border border-black p-4">
                <p>{name}</p>
                <p className="text-gray-400">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppFrame>
  );
}

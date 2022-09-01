import { ReactNode } from "react";
import { useBoolean } from "../../hooks/generic/useBoolean";

interface Props {
  children: ReactNode;
  width?: number;
  height?: number;
  onClose?: (...args: Array<any>) => any;
  padding: number;
}

export default function AppFrame({
  children = <></>,
  width = 60,
  height = 60,
  onClose = () => {},
  padding = 0,
}: Props) {
  // TODO: Make sure if REOPENING to not use a new component.  How to remove entirely?
  const [open, close] = useBoolean(true);
  return open ? (
    <div
      className={`no-scrollbar border-base-content relative top-24 flex h-[80vh] w-[70vw] flex-col overflow-x-clip overflow-y-scroll rounded-lg border-4`}
    >
      <div className="border-base-content bg-base-200 sticky top-0 flex flex-row justify-start space-x-2 border-b px-4 py-2">
        <button
          onClick={() => {
            close();
            onClose();
          }}
          className="btn-circle btn-xs border-base-content rounded-full border-4"
        />
        <div className="btn-circle btn-xs border-base-content rounded-full border-4" />
      </div>
      <div className={`h-full w-full`}>
        <div className={`p-${padding}`}>{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );
}

import { ReactNode } from "react";
import { useBoolean } from "../hooks/useBoolean";

interface Props {
  children: ReactNode;
  width?: number;
  height?: number;
  onClose?: (...args: Array<any>) => any;
}

export default function AppFrame({
  children = <></>,
  width = 80,
  height = undefined,
  onClose = () => {},
}: Props) {
  // TODO: Make sure if REOPENING to not use a new component.  How to remove entirely?
  const [open, close] = useBoolean(true);
  return open ? (
    <div
      className={`bg-base-200 relative top-32 z-30 w-[${width}vw] }
      no-scrollbar border-base-content flex h-[80vh] flex-col overflow-x-hidden overflow-y-scroll rounded-lg border-4`}
    >
      <div className="border-base-content flex w-full flex-row justify-start space-x-2 overflow-x-clip border-b px-4 py-2">
        <button
          onClick={() => {
            close();
            onClose();
          }}
          className="btn-circle btn-xs border-base-content rounded-full border-4"
        />
        <div className="btn-circle btn-xs border-base-content rounded-full border-4" />
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  ) : (
    <></>
  );
}

export const NotificationFrame = ({
  message = "",
  width = 40,
  height = 30,
}: {
  message: string;
  width?: number | string;
  height?: number | string;
}) => (
  <AppFrame>
    <p className="p-4 font-mono">{message}</p>
  </AppFrame>
);

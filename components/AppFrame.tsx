import { useBoolean } from "../hooks/useBoolean";

export default function AppFrame({
  children = <></>,
  width = 40,
  height = null,
}) {
  // TODO: Make sure if REOPENING to not use a new component.  How to remove entirely?
  const [open, close] = useBoolean(true);
  return open ? (
    <div
      className={`bg-base-200 relative top-32 z-30 w-[${width}vw] ${
        height && `max-h-[${height}vh]`
      } no-scrollbar flex flex-col overflow-y-scroll rounded-lg border-4 border-black`}
    >
      <div className="flex w-full flex-row justify-start space-x-2 border-b border-black px-4 py-2">
        <button
          onClick={close}
          className="btn-circle btn-xs rounded-full border-4 border-black"
        />
        <div className="btn-circle btn-xs rounded-full border-4 border-black" />
      </div>
      <div className="h-full w-full bg-white p-4">{children}</div>
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

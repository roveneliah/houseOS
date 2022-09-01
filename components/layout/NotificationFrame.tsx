import AppFrame from "./AppFrame";

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

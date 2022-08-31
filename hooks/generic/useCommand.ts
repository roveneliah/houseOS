import { useAppDispatch } from "@/redux/app/hooks";
import { toggle } from "@/redux/features/windows/windowsSlice";
import { useEffect } from "react";

// Add event listener
export const useCommand = (key: string, fn: Function, param?: any) => {
  useEffect(() => {
    function onKeydown(event: any) {
      event.key === key && (event.metaKey || event.ctrlKey) && fn(param);
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [param, fn]);
};

// Add a set of event listeners
export const useCommands = (
  commands: Array<{ key: string; fn: Function; param?: any }>
) => {
  useEffect(() => {
    const eventListeners = commands.map((command) => {
      function onKeydown(event: any) {
        event.key === command.key &&
          (event.metaKey || event.ctrlKey) &&
          command.fn(command.param);
      }
      return onKeydown;
    });
    eventListeners.map((onKeydown) =>
      window.addEventListener("keydown", onKeydown)
    );
    return () =>
      eventListeners.forEach((onKeydown) =>
        window.removeEventListener("keydown", onKeydown)
      );
  }, [commands]);
};

export const useSearchToggle = () => {
  const dispatch = useAppDispatch();
  const toggleSearch = () => dispatch(toggle({ windowName: "search" }));
  useCommand("k", toggleSearch);
  useCommand("/", toggleSearch);
};

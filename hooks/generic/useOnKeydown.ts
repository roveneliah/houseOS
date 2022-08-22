import { useEffect } from "react";

export const useOnKeydown = (key: string, fn: Function, param?: any) => {
  useEffect(() => {
    function onKeydown(event: any) {
      event.key === key && fn(param);
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [param]);
};

import { useEffect } from "react";

export const useCommand = (key: string, fn: Function, param?: any) => {
  useEffect(() => {
    function onKeydown(event: any) {
      event.key === key && (event.metaKey || event.ctrlKey) && fn(param);
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [param, fn]);
};

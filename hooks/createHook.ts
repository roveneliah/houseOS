import { useEffect, useState } from "react";

export const createHook =
  (fn: Function): Function =>
  (param: any) => {
    const [state, setState] = useState([]);

    useEffect(() => {
      fn(param).then(setState);
    }, []);

    return state;
  };

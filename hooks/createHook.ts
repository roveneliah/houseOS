import { useEffect, useState } from "react";

export default function createHook(fn: Function): Function {
  return (param: any) => {
    const [state, setState] = useState([]);

    useEffect(() => {
      fn(param).then(setState);
    }, [param]);

    return state;
  };
}

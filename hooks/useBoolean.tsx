import { useState } from "react";

export const useBoolean = (initialState: boolean) => {
  const [bool, setBool] = useState<any>(initialState);
  const toggle = () => setBool(!bool);

  return [bool, toggle];
};

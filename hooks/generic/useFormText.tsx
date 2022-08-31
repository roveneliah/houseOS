import { useState } from "react";

// Manage form text state with some nice helper functions
export const useFormText = (initText: string = "") => {
  const [text, setText] = useState(initText);
  const updateText = (event: any) => setText(event.target.value);
  const clear = () => setText("");
  return { text, updateText, clear };
};

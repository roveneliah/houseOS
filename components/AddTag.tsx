import { useState } from "react";

export function AddTag() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="badge overflow-hidden">
      {open ? (
        <>
          <input
            onChange={(e) => setText(e.target.value)}
            className="badge badge-md max-w-fit outline-none"
          />
          <button className="p-2 hover:bg-gray-400">+</button>
        </>
      ) : (
        <p
          className="badge badge-outline hover:bg-gray-400"
          onClick={() => setOpen(true)}
        >
          +
        </p>
      )}
    </div>
  );
}

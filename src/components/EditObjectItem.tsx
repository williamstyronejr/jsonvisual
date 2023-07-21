"use client";

import { useState } from "react";

export default function EditObjectItem({
  initValue,
  onComplete,
  onCancel,
}: {
  initValue: string;
  onComplete: (name: string) => void;
  onCancel: () => void;
}) {
  const [name, setValue] = useState(initValue);

  return (
    <>
      <input
        className="grow px-2 py-1 rounded-md bg-slate-200"
        type="text"
        value={name}
        onChange={(evt) => setValue(evt.target.value)}
      />

      <button
        type="button"
        className="transition-colors shrink-0 py-1 px-5 mx-2 rounded-md bg-[#387afc] hover:bg-[#215bcd]"
        onClick={() => {
          onComplete(name);
        }}
      >
        <div className="check" />
      </button>

      <button
        type="button"
        className="transition-colors shrink-0 pl-2 text-xl text-red-500 hover:text-red-700"
        onClick={() => onCancel()}
      >
        X
      </button>
    </>
  );
}

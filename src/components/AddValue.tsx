"use client";

import { useState } from "react";
import DropDown from "./DropDown";

export default function AddValueItem({
  onComplete,
  onCancel,
  initType,
  initValue,
  initName,
}: {
  onComplete: (name: string, value: any) => void;
  onCancel: () => void;
  initType?: string;
  initValue?: any;
  initName?: string;
}) {
  const [type, setType] = useState(initType || "String");
  const [name, setName] = useState(initName || "");
  const [value, setValue] = useState<string>(initValue || "");

  return (
    <div className="flex flex-row flex-nowrap w-full px-4 py-2 my-1 rounded-lg items-center bg-white">
      <input
        className="w-0 grow rounded-md bg-slate-200 p-2"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />

      <div className="w-0 grow mx-1">
        <DropDown
          options={["Object", "String", "Number", "Array", "Boolean"]}
          value={type}
          changeValue={setType}
        />
      </div>

      <div className="w-0 grow">
        {type === "String" || type === "Number" || type === "Array" ? (
          <input
            className="w-full rounded-md bg-slate-200 p-2"
            type="text"
            placeholder="Value"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
          />
        ) : null}

        {type === "Boolean" ? (
          <DropDown
            options={["true", "false"]}
            value={value}
            title="Boolean"
            changeValue={setValue}
          />
        ) : null}
      </div>

      <button
        type="button"
        className="transition-colors shrink-0 py-2 px-5 ml-1 rounded-md bg-[#387afc] hover:bg-[#215bcd]"
        onClick={() => {
          let actualVal: any = value;
          switch (type) {
            case "Number":
              actualVal = parseFloat(value);
              break;
            case "Array":
              actualVal = actualVal.split(",");
              break;
            case "Boolean":
              actualVal = value === "true";
              break;
            case "Object":
              actualVal = {};
              break;
          }

          onComplete(name, actualVal);
        }}
      >
        <div className="check" />
      </button>

      <button
        type="button"
        className="transition-colors shrink-0 pl-2 mx-1 text-xl  text-red-500 hover:text-slate-700"
        onClick={() => onCancel()}
      >
        X
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";

const JSONError = () => <div>Json is not valid</div>;

const JsonItem = ({ value, title }: { value: any; title: string }) => {
  return (
    <div>
      <div className="flex flex-row flex-nowrap w-full px-4 py-2 bg-white ">
        <button
          className="bg-slate-500 text-white px-2 mr-2"
          type="button"
          onClick={() => {}}
        >
          <span className="block rotate-90">&gt;</span>
        </button>

        <div className="grow text-black">{title}</div>

        <button
          className="transition-colors text-xl text-slate-300 hover:text-slate-600"
          onClick={() => {}}
        >
          X
        </button>
      </div>

      <div className="">
        <button type="button" className="" onClick={() => {}}>
          + ADD
        </button>
      </div>
    </div>
  );
};

const JsonRoot = ({ jsonData }: { jsonData: Record<string, unknown> }) => {
  const keys = Object.keys(jsonData);

  console.log(keys);
  return (
    <div className="text-black">
      {keys.map((key) => (
        <JsonItem key={key} title={key} value={jsonData[key]} />
      ))}
    </div>
  );
};

export default function Home() {
  const [data, setData] = useState(
    '{\n\t"test": {\n \t\t"seconds": "level",\n \t\t"seconds2": "levels2" \n\t}\n}'
  );
  let jsonData: JSON | null = null;

  try {
    jsonData = JSON.parse(data);
  } catch (err) {
    //
  }
  // console.log(jsonData);
  return (
    <main className="flex flex-row flex-nowrap space-around w-full h-full">
      <div className="w-1/2 grow-0 shrink-0 overflow-y-auto">
        <ReactCodeMirror
          className="h-full"
          width="100%"
          height="100%"
          basicSetup={{
            allowMultipleSelections: true,
          }}
          extensions={[json()]}
          theme={tokyoNightStorm}
          value={data}
          onUpdate={(val) => {
            if (val.docChanged) setData(val.state.doc.toString());
          }}
        />
      </div>

      <div className="w-1/2 grow-0 shrink-0 rounded-tl-3xl bg-[#eceaf0] py-10">
        <h2 className="px-4 font-bold">Visual Editor</h2>

        {jsonData === null ? <JSONError /> : <JsonRoot jsonData={jsonData} />}
      </div>
    </main>
  );
}

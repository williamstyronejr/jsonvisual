"use client";

import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";

const JSONError = () => <div>Json is not valid</div>;

const JsonValueItem = ({ value, title }: { value: any; title: string }) => {
  return (
    <div className="my-1">
      <div className="flex flex-row flex-nowrap w-full px-4 py-2 items-center rounded-lg bg-slate-50">
        <div className="mr-2">{typeof value}</div>

        <div>{title}</div>

        <div className="grow text-slate-500 overflow-x-hidden">{value}</div>

        <button
          className="transition-colors text-xl text-slate-300 hover:text-slate-600"
          type="button"
          onClick={() => {}}
        >
          X
        </button>
      </div>
    </div>
  );
};

const JsonItem = ({
  value,
  title,
  level = 0,
}: {
  value: any;
  title: string;
  level: number;
}) => {
  const [collasped, setCollasped] = useState(false);
  return (
    <div style={{ transform: `translateX(${level * 20}px)` }}>
      {typeof value === "object" && !Array.isArray(value) ? (
        <div className="relative">
          <div className="flex flex-row flex-nowrap w-full px-4 py-2 my-2 rounded-lg items-center bg-white ">
            <button
              className="bg-slate-400 rounded-md h-6 text-white px-2 mr-2"
              type="button"
              onClick={() => {
                setCollasped((old) => !old);
              }}
            >
              <span
                className={`block ${
                  collasped ? "-rotate-45" : "rotate-45"
                } arrow`}
              />
            </button>

            <div className="grow text-black">{title}</div>

            <button
              className="transition-colors text-xl text-slate-300 hover:text-slate-600"
              onClick={() => {}}
            >
              X
            </button>
          </div>

          <div className={`${collasped ? "hidden" : "block"}`}>
            {Object.keys(value).map((key) => (
              <JsonItem
                key={key}
                value={value[key]}
                title={key}
                level={level + 1}
              />
            ))}
          </div>

          <div style={{ transform: `translateX(${(level + 1) * 20}px)` }}>
            <button type="button" className="text-slate-500" onClick={() => {}}>
              <span className="text-xl">+</span> ADD
            </button>
          </div>
        </div>
      ) : (
        <JsonValueItem value={value} title={title} />
      )}
    </div>
  );
};

const JsonRoot = ({ jsonData }: { jsonData: Record<string, unknown> }) => {
  const keys = Object.keys(jsonData);

  return (
    <div className="grow text-black overflow-y-auto">
      {keys.map((key) => (
        <JsonItem key={key} title={key} value={jsonData[key]} level={0} />
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

      <div className="flex flex-col flex-nowrap w-1/2 grow-0 shrink-0 rounded-tl-3xl bg-[#eceaf0] pt-5">
        <h2 className="shrink-0 px-4 font-bold my-2">Visual Editor</h2>

        {jsonData === null ? <JSONError /> : <JsonRoot jsonData={jsonData} />}
      </div>
    </main>
  );
}

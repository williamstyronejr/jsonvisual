"use client";

import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import DropDown from "@/components/DropDown";

const JSONError = () => <div>Json is not valid</div>;

const AddValueItem = ({
  onComplete,
  onCancel,
}: {
  onComplete: (name: string, value: any) => void;
  onCancel: () => void;
}) => {
  const [type, setType] = useState("String");
  const [name, setName] = useState("");
  const [value, setValue] = useState<any>("");

  return (
    <div className="flex flex-row flex-nowrap w-full px-4 py-2 my-2 rounded-lg items-center bg-white">
      {/* <div className="grow"> */}
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
        {type === "String" || type === "Number" ? (
          <input
            className="w-full rounded-md bg-slate-200 p-2"
            type="text"
            placeholder="Value"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
          />
        ) : null}
      </div>
      {/* </div> */}

      <div className="shrink-0">
        <button
          type="button"
          className=""
          onClick={() => {
            onComplete(name, type === "Object" ? {} : value);
          }}
        >
          C
        </button>

        <button type="button" className="" onClick={() => onCancel()}>
          X
        </button>
      </div>
    </div>
  );
};

const AddItem = ({
  path,
  level,
  addValue,
}: {
  path: string;
  level: number;
  addValue: (path: string, val: any) => void;
}) => {
  const [displayAdd, setDisplayAdd] = useState(false);

  return (
    <div style={{ transform: `translateX(${(level + 1) * 20}px)` }}>
      {displayAdd ? (
        <AddValueItem
          onCancel={() => setDisplayAdd(false)}
          onComplete={(title, val) => {
            addValue(`${path},${title}`, val);
            setDisplayAdd(false);
          }}
        />
      ) : (
        <button
          type="button"
          className="text-slate-500"
          onClick={() => {
            setDisplayAdd(true);
          }}
        >
          <span className="text-xl">+</span> ADD
        </button>
      )}
    </div>
  );
};

const JsonValueItem = ({
  value,
  title,
  path,
  addValue,
  deletePath,
}: {
  value: any;
  title: string;
  path: string;
  addValue: (path: string, value: any) => void;
  deletePath: (path: string) => void;
}) => {
  return (
    <div className="my-1">
      <div className="flex flex-row flex-nowrap w-full px-4 py-2 items-center rounded-lg bg-slate-50">
        <div className="mr-2">{typeof value}</div>

        <div>{title}</div>

        <div className="grow text-slate-500 overflow-x-hidden">{value}</div>

        <button
          className="transition-colors text-xl text-slate-300 hover:text-slate-600"
          type="button"
          onClick={() => {
            deletePath(path);
          }}
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
  path,
  deletePath,
  addValue,
  level = 0,
}: {
  value: any;
  title: string;
  path: string;
  deletePath: (path: string) => void;
  addValue: (path: string, value: any) => void;
  level?: number;
}) => {
  const [collasped, setCollasped] = useState(false);

  return (
    <div style={{ transform: `translateX(${level * 20}px)` }}>
      {typeof value === "object" && !Array.isArray(value) ? (
        <div className="relative">
          <div className="flex flex-row flex-nowrap w-full px-4 py-2 my-2 rounded-lg items-center bg-white">
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
              onClick={() => {
                deletePath(path);
              }}
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
                path={`${path},${key}`}
                level={level + 1}
                addValue={addValue}
                deletePath={deletePath}
              />
            ))}
          </div>

          <AddItem path={path} level={level} addValue={addValue} />
        </div>
      ) : (
        <JsonValueItem
          value={value}
          title={title}
          path={path}
          deletePath={deletePath}
          addValue={addValue}
        />
      )}
    </div>
  );
};

const JsonRoot = ({
  jsonData,
  deletePath,
  addValue,
}: {
  jsonData: Record<string, unknown>;
  deletePath: (path: string) => void;
  addValue: (path: string, value: any) => void;
}) => {
  const keys = Object.keys(jsonData);

  return (
    <div className="grow text-black overflow-y-auto">
      {keys.map((key) => (
        <JsonItem
          key={key}
          title={key}
          value={jsonData[key]}
          level={0}
          path={key}
          deletePath={deletePath}
          addValue={addValue}
        />
      ))}
      <AddItem path="" level={-1} addValue={addValue} />
    </div>
  );
};

function deletePropertyPath(obj: any, paths: string) {
  let path: any[] = [];
  if (!obj || !paths) {
    return;
  }

  if (typeof paths === "string") {
    path = paths.split(",");
  }

  for (var i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];

    if (typeof obj === "undefined") {
      return;
    }
  }

  delete obj[path.pop()];
}

function addPropertyPath(obj: any, paths: string, value: any) {
  let path: any[] = [];
  if (!obj || !paths) {
    return;
  }

  if (typeof paths === "string") {
    path = paths.split(",");
  }

  console.log({ path, paths, value });
  if (path[0] === "") return (obj[paths[1]] = value);

  for (var i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];
  }

  obj[path[path.length - 1]] = value;
}

export default function Home() {
  const [data, setData] = useState(
    '{\n\t"test": {\n \t\t"seconds": "level",\n \t\t"seconds2": "levels2" \n\t}\n}'
  );
  let jsonData: JSON | null = null;

  const deleteFromJson = (path: string) => {
    if (jsonData) {
      deletePropertyPath(jsonData, path);
      setData(JSON.stringify(jsonData, null, 2));
    }
  };

  const addToJson = (path: string, value: any) => {
    if (jsonData) {
      addPropertyPath(jsonData, path, value);
      setData(JSON.stringify(jsonData, null, 2));
    }
  };

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

        {jsonData === null ? (
          <JSONError />
        ) : (
          <JsonRoot
            jsonData={jsonData}
            deletePath={deleteFromJson}
            addValue={addToJson}
          />
        )}
      </div>
    </main>
  );
}

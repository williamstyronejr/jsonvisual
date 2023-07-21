"use client";

import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import EditObjectItem from "@/components/EditObjectItem";
import AddValueItem from "@/components/AddValue";
import {
  capitialFirst,
  deletePropertyPath,
  addPropertyPath,
} from "./utils/utils";

const initialData = {
  person: {
    name: "Nate Turner",
    age: 12,
    titles: ["Actor", "Screen Writer", "Director"],
    public: true,
  },
  meta: {
    created: "test",
  },
};

const JSONError = () => <div className="text-black">Json is not valid</div>;

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
  const type = Array.isArray(value) ? "array" : typeof value;
  const [editing, setEditing] = useState(false);

  return (
    <div className="my-1">
      {editing ? (
        <AddValueItem
          onComplete={(name, value) => {
            deletePath(path);
            addValue(
              `${path.split(",").slice(0, -1).join(",")},${name}`,
              value
            );
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
          initType={capitialFirst(type)}
          initValue={value.toString()}
          initName={title}
        />
      ) : (
        <div className="flex flex-row flex-nowrap w-full px-4 py-1 items-center rounded-lg bg-slate-50">
          <div className="mr-2">
            {type === "string" ? (
              <svg
                className="w-8 h-10 inline-block mr-1"
                viewBox="-2.25 -2.25 29.50 29.50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                strokeWidth="0.00025"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  strokeWidth="0"
                  transform="translate(1.875,1.875), scale(0.85)"
                >
                  <rect
                    x="-2.25"
                    y="-2.25"
                    width="29.50"
                    height="29.50"
                    rx="3.835"
                    fill="#1fbf1d"
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.15"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M11.6748 15.5227H13.1855L9.87842 6.36304H8.34863L5.0415 15.5227H6.50146L7.3457 13.0916H10.8369L11.6748 15.5227ZM9.04053 8.02612H9.14844L10.4751 11.8982H7.70752L9.04053 8.02612Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    d="M16.8101 14.488C16.0674 14.488 15.5278 14.1262 15.5278 13.5042C15.5278 12.8948 15.9595 12.571 16.9116 12.5076L18.6001 12.3997V12.9773C18.6001 13.8342 17.8384 14.488 16.8101 14.488ZM16.4609 15.637C17.3687 15.637 18.124 15.2434 18.5366 14.5515H18.6445V15.5227H19.9585V10.8C19.9585 9.34009 18.981 8.47681 17.248 8.47681C15.6802 8.47681 14.563 9.23853 14.4233 10.4255H15.7437C15.896 9.93677 16.4229 9.65747 17.1846 9.65747C18.1177 9.65747 18.6001 10.0701 18.6001 10.8V11.3967L16.7275 11.5046C15.0835 11.6062 14.1567 12.3235 14.1567 13.5676C14.1567 14.8308 15.1279 15.637 16.4609 15.637Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.9585 18.637L5.0415 18.637V17.437L19.9585 17.437V18.637Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            ) : null}

            {type === "object" ? (
              <svg
                className="w-8 h-10 inline-block mr-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5144 1.12584C11.8164 0.958052 12.1836 0.958052 12.4856 1.12584L21.4845 6.12522C21.4921 6.12942 21.4996 6.13372 21.5071 6.13813C21.8125 6.31781 22 6.64568 22 7V17C22 17.3632 21.8031 17.6978 21.4856 17.8742L12.4856 22.8742C12.1791 23.0445 11.8059 23.0416 11.5022 22.8673L2.51436 17.874C2.19689 17.6977 2 17.3631 2 16.9999V7C2 6.64568 2.18749 6.3177 2.49287 6.13802L2.5073 6.13784L2.51436 6.12584L11.5144 1.12584ZM12.0001 10.856L5.05923 6.99995L12 3.14396L18.9409 7L12.0001 10.856ZM4 8.69951V16.4115L11 20.3004V12.5884L4 8.69951ZM13 12.5884V20.3005L20 16.4116V8.69951L13 12.5884Z"
                    fill="#8b89e1"
                  ></path>
                </g>
              </svg>
            ) : null}

            {type === "number" ? (
              <svg
                className="w-8 h-10 inline-block mr-1"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  strokeWidth="0"
                  transform="translate(1.8000000000000007,1.8000000000000007), scale(0.85)"
                >
                  <rect
                    x="-2.4"
                    y="-2.4"
                    width="28.80"
                    height="28.80"
                    rx="3.744"
                    fill="#1a95f6"
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g clipPath="url(#clip0_429_10997)">
                    {" "}
                    <path
                      d="M8 8C8 6.97631 8.39052 5.95262 9.17157 5.17157C10.7337 3.60947 13.2663 3.60947 14.8284 5.17157C16.3905 6.73366 16.3905 9.26632 14.8284 10.8284L9.17157 16.4853C8.42143 17.2354 8 18.2528 8 19.3137L8 20L16 20"
                      stroke="#ffffff"
                      strokeWidth="1.464"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                  <defs>
                    <clipPath id="clip0_429_10997">
                      <rect width="24" height="24" fill="white"></rect>
                    </clipPath>
                  </defs>
                </g>
              </svg>
            ) : null}

            {type === "boolean" ? (
              <svg
                className="w-8 h-10 inline-block mr-1"
                viewBox="-163.84 -163.84 1351.68 1351.68"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="0.01024"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  strokeWidth="0"
                  transform="translate(76.80000000000001,76.80000000000001), scale(0.85)"
                >
                  <rect
                    x="-163.84"
                    y="-163.84"
                    width="1351.68"
                    height="1351.68"
                    rx="175.7184"
                    fill="#f8884f"
                  ></rect>
                </g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#ffffff"
                    d="M352 159.872V230.4a352 352 0 1 0 320 0v-70.528A416.128 416.128 0 0 1 512 960a416 416 0 0 1-160-800.128z"
                  ></path>
                  <path
                    fill="#ffffff"
                    d="M512 64q32 0 32 32v320q0 32-32 32t-32-32V96q0-32 32-32z"
                  ></path>
                </g>
              </svg>
            ) : null}

            {type === "array" ? (
              <svg
                className="w-8 h-10 inline-block mr-1"
                width="201px"
                height="201px"
                viewBox="-6.24 -6.24 28.48 28.48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                strokeWidth="0.00016"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  strokeWidth="0"
                  transform="translate(1.2000000000000002,1.2000000000000002), scale(0.85)"
                >
                  <rect
                    x="-6.24"
                    y="-6.24"
                    width="28.48"
                    height="28.48"
                    rx="3.7024"
                    fill="#9463d4"
                  ></rect>
                </g>

                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="nonzero"
                    clipRule="nonzero"
                    d="M0 0.774194C0 0.346618 0.346618 0 0.774194 0H4.3871C4.81467 0 5.16129 0.346618 5.16129 0.774194C5.16129 1.20177 4.81467 1.54839 4.3871 1.54839H1.54839V14.4516H4.3871C4.81467 14.4516 5.16129 14.7982 5.16129 15.2258C5.16129 15.6534 4.81467 16 4.3871 16H0.774194C0.346618 16 0 15.6534 0 15.2258V0.774194ZM10.8387 0.774194C10.8387 0.346618 11.1853 0 11.6129 0H15.2258C15.6534 0 16 0.346618 16 0.774194V15.2258C16 15.6534 15.6534 16 15.2258 16H11.6129C11.1853 16 10.8387 15.6534 10.8387 15.2258C10.8387 14.7982 11.1853 14.4516 11.6129 14.4516H14.4516V1.54839H11.6129C11.1853 1.54839 10.8387 1.20177 10.8387 0.774194ZM4.12903 4.90323C4.12903 4.47565 4.47565 4.12903 4.90323 4.12903H11.0968C11.5243 4.12903 11.871 4.47565 11.871 4.90323C11.871 5.3308 11.5243 5.67742 11.0968 5.67742H8.77419V13.1613C8.77419 13.5889 8.42758 13.9355 8 13.9355C7.57242 13.9355 7.22581 13.5889 7.22581 13.1613V5.67742H4.90323C4.47565 5.67742 4.12903 5.3308 4.12903 4.90323Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            ) : null}

            <span>{title}</span>
          </div>

          <div className="w-0 grow text-slate-500 overflow-hidden whitespace-nowrap text-ellipsis px-4">
            {Array.isArray(value) ? `[${value.toString()}]` : value.toString()}
          </div>

          <button
            className="mr-3"
            onClick={() => {
              setEditing(true);
            }}
          >
            <svg
              className="transition-colors w-6 h-6 stroke-black hover:stroke-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </button>

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
      )}
    </div>
  );
};

const AddRowItem = ({
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
    <div
      className="mt-4"
      style={{ transform: `translateX(${(level + 1) * 20}px)` }}
    >
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
          className="text-slate-500 px-6"
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

const JsonGroup = ({
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
  const [editting, setEditing] = useState(false);

  return (
    <div
      className="relative"
      style={{
        left: `${level * 40}px`,
      }}
    >
      {typeof value === "object" && !Array.isArray(value) ? (
        <div className="">
          <div className="flex flex-row flex-nowrap w-full px-4 py-2 my-2 z-10 rounded-lg items-center bg-white">
            {editting ? (
              <EditObjectItem
                initValue={title}
                onCancel={() => setEditing(false)}
                onComplete={(name) => {
                  console.log({ path, name });
                  deletePath(path);
                  addValue(
                    `${path.split(",").slice(0, -1).join(",")},${name}`,
                    value
                  );
                  setEditing(false);
                }}
              />
            ) : (
              <>
                <button
                  className="bg-slate-300 rounded-md h-6 text-white px-2 mr-2"
                  type="button"
                  onClick={() => {
                    setCollasped((old) => !old);
                  }}
                >
                  <span
                    className={`block transition-transform ${
                      collasped ? "-rotate-45 mb-px" : "rotate-45 mb-0.5"
                    } arrow`}
                  />
                </button>

                <div className="grow text-black">{title}</div>

                <button
                  className="mr-3"
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  <svg
                    className="transition-colors w-6 h-6 stroke-black hover:stroke-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </button>

                <button
                  className="transition-colors text-xl text-slate-300 hover:text-slate-600"
                  onClick={() => {
                    deletePath(path);
                  }}
                >
                  X
                </button>
              </>
            )}
          </div>

          <div className={`${collasped ? "hidden" : "block"}`}>
            {Object.keys(value).map((key) => (
              <JsonGroup
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

          <div className={`${collasped ? "hidden" : "block"}`}>
            <AddRowItem path={path} level={level} addValue={addValue} />
          </div>
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
    <div className="flex flex-col flex-nowrap grow text-black overflow-y-auto px-4">
      {keys.map((key) => (
        <JsonGroup
          key={key}
          title={key}
          value={jsonData[key]}
          level={0}
          path={key}
          deletePath={deletePath}
          addValue={addValue}
        />
      ))}

      <AddRowItem path="" level={-1} addValue={addValue} />
    </div>
  );
};

export default function MainPage() {
  const [data, setData] = useState(JSON.stringify(initialData, null, 2));
  let jsonData: Record<string, unknown> | null = null;

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
        <h2 className="shrink-0 px-4 font-bold my-2 text-black">
          Visual Editor
        </h2>

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

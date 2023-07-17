import { useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

const DropDown = ({
  options,
  value,
  changeValue,
  title = "",
}: {
  options: string[];
  value: string;
  title?: string;
  changeValue: Function;
}) => {
  const [active, setActive] = useState(false);
  const ref = useOutsideClick({
    active,
    closeEvent: () => {
      setActive(false);
    },
    ignoreButton: true,
  });

  return (
    <>
      <div className="" ref={ref}>
        <div className={`${active ? "" : ""}`}>
          <button
            className="w-full text-left rounded-md p-2 bg-slate-200"
            type="button"
            onClick={() => {
              setActive((old) => !old);
            }}
          >
            {value !== "" ? value : title}
          </button>

          <div className="relative w-full">
            <div
              className={`${
                active ? "flex" : "hidden"
              } flex-col flex-nowrap absolute w-full shadow-lg rounded-xl z-20 origin-[top_center] bg-slate-100`}
            >
              {options.map((option) => (
                <>
                  <button
                    key={`select-${option}`}
                    className="transition-colors text-left my-0.5 pl-3 py-0.5 hover:bg-slate-300"
                    type="button"
                    onClick={() => {
                      setActive(false);
                      changeValue(option);
                    }}
                    disabled={value === option}
                  >
                    {option === "String" ? (
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

                    {option === "Object" ? (
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

                    {option === "Number" ? (
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

                    {option === "Boolean" ? (
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

                    {option === "Array" ? (
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

                    <span>{option}</span>
                  </button>

                  {option === "Object" ? <hr className="my-1" /> : null}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDown;

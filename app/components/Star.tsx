import React from "react";
import { Movie, MovieSearch } from "../types";

type StarProps = {
  font: string;
  star: number | undefined;
  size: string;
  color: string;
  tfont: string;
  tcolor: string;
  weight: string;
};

export const Star = ({ font, color, tfont, size, tcolor, star, weight }: StarProps) => {
  return (
    <div className="flex gap-1 items-center p-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.16667 0.5L9.22667 4.67333L13.8333 5.34667L10.5 8.59333L11.2867 13.18L7.16667 11.0133L3.04667 13.18L3.83333 8.59333L0.5 5.34667L5.10667 4.67333L7.16667 0.5Z"
          fill="#FDE047"
          stroke="#FDE047"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-center">
        <span className={`${font} ${color} ${weight}`}>{star?.toFixed(1)}</span>
        <span className={`${tfont} ${tcolor}`}>/10</span>
      </p>
    </div>
  );
};

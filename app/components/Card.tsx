import React from "react";
import { Star } from "./Star";
import { Movie } from "../types";
import Link from "next/link";

export const Card = ({ upcom }: { upcom: Movie }) => {
  return (
    <Link
      href={`details/${upcom.id}`}
      className="w-[300.73px] h-[480px] bg-[#f4f4f5] rounded-xl overflow-hidden shadow-lg"
    >
      <div>
        <img
          className="w-full h-[380px]"
          src={`https://image.tmdb.org/t/p/w500${upcom.poster_path}`}
          alt=""
        />
        <Star
          star={upcom?.vote_average}
          font="text-[14px]"
          color="text-black"
          tfont="text-[12px]"
          size="14px"
          tcolor="text-[#71717A]"
        />
        <p className="pl-2">{upcom.title}</p>
      </div>
    </Link>
  );
};

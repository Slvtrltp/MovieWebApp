import React from "react";
import { Star } from "./Star";
import { Movie } from "../types";
import Link from "next/link";

type Props = {
  upcom: Movie;
  size: string;
};

export const Card = ({ upcom, size }: Props) => {
  return (
    <Link
      href={`/details/${upcom.id}`}
      className="w-full h-[480px] rounded-xl overflow-hidden shadow-lg dark:shadow-lg dark:shadow-white"
    >
      <div>
        <img
          className={`${size} h-[380px] object-fit rounded-xl`}
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

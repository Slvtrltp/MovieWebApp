import React from "react";
import { Star } from "./Star";
import { Movie } from "../types";

export const Card = ({ upcom }: { upcom: Movie }) => {
  return (
    <div className="w-[300.73px] h-[480px] bg-[#f4f4f5] rounded-xl overflow-hidden">
      <div></div>
      <div>
        <img
          className="w-full h-[380px]"
          src={`https://image.tmdb.org/t/p/w500${upcom.poster_path}`}
          alt=""
        />
        <Star star={upcom} />
        <p>{upcom.title}</p>
      </div>
    </div>
  );
};

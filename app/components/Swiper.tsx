import React, { useEffect, useState } from "react";
import { Movie, VideoResult } from "../types";
import { Star } from "./Star";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

export const SwiperM = ({ trend }: { trend: Movie }) => {
  const [trailer, setTrailer] = useState<VideoResult[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${trend.id}/videos?api_key=e9d4d5685134cf9beea42eb980587ebd`,
      )
      .then((res) => {
        const trailers = res.data.results.filter(
          (video: VideoResult) =>
            video.type === "Trailer" && video.site === "YouTube",
        );
        setTrailer(trailers);
      });
  }, []);

  return (
    <div className="relative">
      <img
        className="w-full h-200 absolute bg-center object-cover z-0 "
        src={`https://image.tmdb.org/t/p/original${trend.backdrop_path}`}
        alt=""
      />
      <div className="absolute bottom-0 left-40  z-2 gap-4 top-60">
        <div>
          <p className="text-[18px] text-white">Now Playing:</p>
          <h1 className="text-[36px] font-bold text-white">{trend.title}</h1>
          <Star
            star={trend?.vote_average}
            font="text-[18px]"
            size="20px"
            color="text-white"
            tcolor="text-[#71717A]"
            tfont="text-[16px]"
          />
        </div>
        <p className="w-92.5 text-white pb-4">{trend.overview}</p>

        <Dialog>
          <DialogTrigger asChild>
            <button className="flex bg-white items-center gap-2 py-2 px-4 rounded-lg ">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33301 2L12.6663 8L3.33301 14V2Z"
                  stroke="#18181B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Watch Trailer
            </button>
          </DialogTrigger>
          <DialogContent
            className="min-w-5xl w-full  p-0 overflow-hidden"
            showCloseButton={false}
          >
            <DialogHeader>
              <div className=" aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer[0]?.key}?autoplay=0`}
                  allowFullScreen
                  className="w-full h-full rounded-md"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

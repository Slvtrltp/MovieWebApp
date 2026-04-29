"use client";
import { Footer } from "@/app/components/Footer";
import { Navigation } from "@/app/components/Navigation";
import { Morelike, Movie, MovieDetails } from "@/app/types";
import axios from "axios";
import { Star } from "@/app/components/Star";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { Card } from "@/app/components/Card";

export default function Home() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const { id } = useParams();
  const [genres, setGenres] = useState<MovieDetails[]>([]);
  const [more, setMore] = useState<Morelike[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e9d4d5685134cf9beea42eb980587ebd&language=en-US`,
      )
      .then((res) => {
        setMovie(res.data);
        setGenres(res.data.genres);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
      )
      .then((res) => {
        setMore(res.data.results);
      });
  }, []);

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="w-full">
      <div>
        <Navigation />
      </div>

      <div className=" flex justify-between px-70 space-y-6 mt-13">
        <div>
          <h1 className="text-[36px] font-semibold">{movie?.original_title}</h1>
          <p>
            {movie?.release_date}, {formatRuntime(movie?.runtime)}
          </p>
        </div>
        <div className="">
          <p className="pl-2 text-[12px]">Rating</p>
          <Star
            star={movie?.vote_average}
            size="28px"
            font="text-[18px]"
            color="text-black"
            tfont="text-[16px]"
            tcolor="text-[#71717A]"
            weight="font-semibold"
          />
          <li className="pl-2 text-[#71717A] text-[12px]">
            {movie?.vote_count}k
          </li>
        </div>
      </div>
      <div className="flex gap-10 px-70">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt="movie"
          className=" h-[550px]"
        />
        <div className="w-[1000px] h-[550px] bg-gray-100"></div>
      </div>
      <div className="space-y-5">
        <div className="flex gap-3 px-70 mt-8">
          {genres.map((genre) => (
            <div key={genre.id}>
              <button className="border cursor-pointer duration-300  text-xs font-semibold py-0.5 pl-2.5 pr-2 border-[#E4E4E7] rounded-full flex items-center gap-2  hover:bg-[#E4E4E7]">
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <p className="px-70">{movie?.overview}</p>
        <div className="px-70 space-y-5">
          <div className="space-y-1">
            <div className="flex gap-13 ">
              <h2 className="text-[16px] font-bold">Director</h2>
              <p></p>
            </div>
            <div className="border border-[#E4E4E7]"></div>
          </div>
          <div className="space-y-1">
            <div className="flex gap-13 ">
              <h2 className="text-[16px] font-bold">Writers</h2>
              <p></p>
            </div>
            <div className="border border-[#E4E4E7]"></div>
          </div>
          <div className="space-y-1">
            <div className="flex gap-13 ">
              <h2 className="text-[16px] font-bold">Stars</h2>
              <p></p>
            </div>
            <div className="border border-[#E4E4E7]"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-between  px-70 items-center pt-8 ">
        <div className=" text-[24px] font-semibold">More like this</div>
        <p className="cursor-pointer">See more</p>
      </div>
      <div className="grid grid-cols-5 w-[2100px] w-fit px-70 mt-8 gap-11">
        {more.slice(0, 5).map((more) => (
          <Card upcom={more} key={more.id} />
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

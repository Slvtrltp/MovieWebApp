import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Genres, MovieSearch } from "../types";

export const Navigation = () => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [movieSearch, setMovieSearch] = useState<MovieSearch[]>([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres);
      });
  }, []);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=d67d8bebd0f4ff345f6505c99e9d0289&query=fight%20club",
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieSearch(data.);
      });
  }, []);
  return (
    <div className="py-[11.5px] ">
      <div className="container mx-auto ">
        <div className="flex justify-between ">
          <Link href={"/"} className="flex gap-2 items-center">
            <img className="w-5" src="/logo.svg" alt="logo" />
            <p className="text-[#4338CA] font-semibold italic">Movie Z</p>
          </Link>
          <div className="flex gap-3 items-center relative">
            <button
              onClick={() => {
                setIsVisible(!isVisible);
              }}
              className="py-2 px-4 border rounded-lg border-[#E4E4E7] flex items-center justify-center gap-2"
            >
              <img className="w-4" src="/down.svg" alt=""></img>
              Genre
              <p className="text-sm w-10.25 h-5"></p>
            </button>
            <div className="flex gap-2.5 border rounded-lg border-[#E4E4E7] w-94 h-9 pl-3 pr-3">
              <img className="w-4" src="/search.svg" alt="search" />

              <input
                className="w-83.25 outline-0"
                placeholder="search.."
              ></input>
            </div>
            <div
              data-shown={isVisible}
              className="invisible opacity-0 p-5 border border-[#E4E4E7] bg-white rounded-lg absolute w-144.25 duration-300 top-13  data-[shown=true]:visible data-[shown=true]:opacity-100"
            >
              <h1 className="text-[24px] font-semibold text-[#09090B]">
                Genres
              </h1>
              <p className="text-[16px] text-[#09090B] ">
                See lists of movies by genre
              </p>
              <hr className="border border-[#E4E4E7] my-4" />
              <div className="flex flex-wrap gap-4">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    className="border cursor-pointer duration-300 text-xs font-semibold py-0.5 pl-2.5 pr-2 border-[#E4E4E7] rounded-full flex items-center gap-2  hover:bg-[#E4E4E7]"
                  >
                    {genre.name}
                    <svg
                      width="5"
                      height="9"
                      viewBox="0 0 5 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 8.5L4.5 4.5L0.5 0.5"
                        stroke="#09090B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="w-[577px] bg-white border border-[#E4E4E7] rounded-lg min-h-[128] absolute top-13 "></div>
          </div>
          <div className="py-2 px-4 border border-[#E4E4E7] rounded-lg flex justify-center items-center cursor-pointer">
            <img src="/moon.svg" alt="mode" />
          </div>
        </div>
      </div>
    </div>
  );
};

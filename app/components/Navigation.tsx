import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Genres, Movie, MovieSearch } from "../types";
import { Star } from "./Star";
import axios from "axios";

export const Navigation = () => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [movieSearch, setMovieSearch] = useState<MovieSearch[]>([]);
  const [search, setSearch] = useState<string>("");

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
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
      )
      .then((res) => setMovieSearch(res.data.results));
  }, [search]);

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
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (isVisible) {
                    setIsVisible(false);
                  }
                }}
                className={`w-83.25 outline-0 `}
                placeholder="search.."
              ></input>
            </div>
            <div
              data-shown={isVisible}
              className="invisible opacity-0 p-5 border border-[#E4E4E7] bg-white rounded-lg z-2 absolute w-144.25 duration-300 top-13  data-[shown=true]:visible data-[shown=true]:opacity-100"
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
                    className="border cursor-pointer duration-300  text-xs font-semibold py-0.5 pl-2.5 pr-2 border-[#E4E4E7] rounded-full flex items-center gap-2  hover:bg-[#E4E4E7]"
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
            {movieSearch.length === 0 && search !== "" ? (
              <div
                className={`w-[577px] flex justify-center items-center bg-white border border-[#E4E4E7] rounded-lg min-h-[88px] z-2 absolute top-13 p-6 text-[14px] ${search !== "" && movieSearch.length === 0 ? "visible" : "invisible"} ${search.length > 0 ? "visible" : "invisible"}`}
              >
                No results found.
              </div>
            ) : (
              <div
                className={`w-[577px] bg-white border border-[#E4E4E7] rounded-lg min-h-[128] absolute z-2 top-13 p-3 ${search.length > 0 ? "visible" : "invisible"}`}
              >
                {movieSearch.slice(0, 5).map((movie) => (
                  <div key={movie.id} className="p-2 space-y-2 flex gap-4 ">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="h-[100px] w-[67px] object-cover transition-transform group-hover:scale-105 rounded-md"
                    />

                    <div className="space-y-3">
                      <div>
                        <h1 className="text-[20px] font-semibold">
                          {movie.title}
                        </h1>

                        <Star star={movie} />
                      </div>
                      <div className="flex gap-70">
                        <p>{movie.release_date.split("-")[0]}</p>
                        <button className="flex items-center gap-3">
                          See more
                          <span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.33301 7.99967H12.6663M12.6663 7.99967L7.99967 3.33301M12.6663 7.99967L7.99967 12.6663"
                                stroke="#18181B"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_1249_6382)">
                <path
                  d="M2 11C2 5.47715 6.47715 1 12 1H28C33.5228 1 38 5.47715 38 11V27C38 32.5228 33.5228 37 28 37H12C6.47715 37 2 32.5228 2 27V11Z"
                  fill="white"
                  shapeRendering="crispEdges"
                />
                <path
                  d="M12 1.5H28C33.2467 1.5 37.5 5.7533 37.5 11V27C37.5 32.2467 33.2467 36.5 28 36.5H12C6.7533 36.5 2.5 32.2467 2.5 27V11C2.5 5.7533 6.7533 1.5 12 1.5Z"
                  stroke="#E4E4E7"
                  shapeRendering="crispEdges"
                />
                <path
                  d="M20 13C19.2044 13.7956 18.7574 14.8748 18.7574 16C18.7574 17.1252 19.2044 18.2044 20 19C20.7957 19.7956 21.8748 20.2426 23 20.2426C24.1252 20.2426 25.2044 19.7956 26 19C26 20.1867 25.6481 21.3467 24.9888 22.3334C24.3295 23.3201 23.3925 24.0892 22.2961 24.5433C21.1997 24.9974 19.9933 25.1162 18.8295 24.8847C17.6656 24.6532 16.5965 24.0818 15.7574 23.2426C14.9182 22.4035 14.3468 21.3344 14.1153 20.1705C13.8838 19.0067 14.0026 17.8003 14.4567 16.7039C14.9109 15.6075 15.6799 14.6705 16.6666 14.0112C17.6533 13.3519 18.8133 13 20 13Z"
                  stroke="#18181B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

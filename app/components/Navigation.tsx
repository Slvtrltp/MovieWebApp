"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Genres, Movie, MovieDetails, MovieSearch } from "../types";
import { Star } from "./Star";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export const Navigation = () => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [movieSearch, setMovieSearch] = useState<MovieSearch[]>([]);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const { theme, setTheme } = useTheme();

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
    <div className="flex flex-col items-center py-[11.5px] ">
      <div className="  mx-auto container">
        <div className="flex justify-between  ">
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
            <div className="py-2 px-4 flex gap-2.5 border rounded-lg border-[#E4E4E7] w-94 h-9 pl-3 pr-3">
              <img className="w-4" src="/search.svg" alt="search" />

              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (isVisible) {
                    setIsVisible(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim() !== "") {
                    router.push(`/search/${encodeURIComponent(search)}`);
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
                {genres.map((genre) => {
                  return (
                    <Link
                      href={`/genre/${genre.id}`}
                      key={genre.id}
                      className={`border cursor-pointer duration-300   text-xs font-semibold py-0.5 pl-2.5 pr-2 border-[#E4E4E7] rounded-full flex items-center gap-2  hover:bg-[#E4E4E7]`}
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
                    </Link>
                  );
                })}
              </div>
            </div>
            {movieSearch.length === 0 && search !== "" ? (
              <div
                className={`w-[577px] bg-white border border-[#E4E4E7] rounded-lg min-h-[88px] z-2 absolute top-13 p-6 text-[14px] ${search !== "" && movieSearch.length === 0 ? "visible" : "invisible"} ${search.length > 0 ? "visible" : "invisible"}`}
              >
                <div className="flex justify-center pb-7">
                  <p>No results found.</p>
                </div>
                <Link href={`/search/${encodeURIComponent(search)}`}>
                  <p className="border-t border-[#E4E4E7] pt-4 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                    See all results for <span>&quot;{search}&quot;</span>
                  </p>
                </Link>
              </div>
            ) : (
              <div
                className={`w-[577px] bg-white border border-[#E4E4E7] rounded-lg min-h-[128] absolute z-2 top-13 p-3 ${search.length > 0 ? "visible" : "invisible"}`}
              >
                {movieSearch.slice(0, 5).map((movie) => (
                  <Link
                    href={`/details/${movie.id}`}
                    key={movie.id}
                    className="p-2 space-y-2 flex gap-4 "
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="h-[100px] w-[67px] object-cover transition-transform group-hover:scale-105 rounded-md"
                    />

                    <div className="space-y-3">
                      <div>
                        <h1 className="text-[20px] font-semibold">
                          {movie.title}
                        </h1>

                        <Star
                          star={movie.vote_average}
                          font="text-[14px]"
                          color="text-black"
                          tfont="text-[12px]"
                          size="14px"
                          tcolor="text-[#71717A]"
                        />
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
                  </Link>
                ))}

                <Link href={`/search/${encodeURIComponent(search)}`}>
                  <div className="border-t border-[#E4E4E7] pt-2">
                    <p className="cursor-pointer group relative inline-block transition-all duration-300">
                      See all results for <span>&quot;{search}&quot;</span>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#E4E4E7] transition-all duration-300 group-hover:w-full"></span>
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <button
            className="dark:bg-black"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            {theme === "dark" ? (
              <svg
                className="border border-white bg-black rounded-[10px] w-10 h-10 flex justify-center items-center"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2C7.20435 2.79565 6.75736 3.87478 6.75736 5C6.75736 6.12522 7.20435 7.20435 8 8C8.79565 8.79565 9.87478 9.24264 11 9.24264C12.1252 9.24264 13.2044 8.79565 14 8C14 9.18669 13.6481 10.3467 12.9888 11.3334C12.3295 12.3201 11.3925 13.0892 10.2961 13.5433C9.19975 13.9974 7.99335 14.1162 6.82946 13.8847C5.66558 13.6532 4.59648 13.0818 3.75736 12.2426C2.91825 11.4035 2.3468 10.3344 2.11529 9.17054C1.88378 8.00666 2.0026 6.80026 2.45673 5.7039C2.91085 4.60754 3.67989 3.67047 4.66658 3.01118C5.65328 2.35189 6.81331 2 8 2Z"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="border border-black rounded-[10px] w-10 h-10 flex justify-center items-center"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2881_2258)">
                  <path
                    d="M8.00004 1.3335V2.66683M8.00004 13.3335V14.6668M3.28671 3.28683L4.22671 4.22683M11.7734 11.7735L12.7134 12.7135M1.33337 8.00016H2.66671M13.3334 8.00016H14.6667M4.22671 11.7735L3.28671 12.7135M12.7134 3.28683L11.7734 4.22683M10.6667 8.00016C10.6667 9.47292 9.4728 10.6668 8.00004 10.6668C6.52728 10.6668 5.33337 9.47292 5.33337 8.00016C5.33337 6.5274 6.52728 5.3335 8.00004 5.3335C9.4728 5.3335 10.6667 6.5274 10.6667 8.00016Z"
                    stroke="#18181B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2881_2258">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

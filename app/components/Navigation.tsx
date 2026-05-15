"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Genres, Movie } from "../types";
import { Star } from "./Star";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export const Navigation = () => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [movieSearch, setMovieSearch] = useState<Movie[]>([]);
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
    <div className="flex flex-col items-center py-6.25 dark:bg-black">
      <div className="  mx-auto container">
        <div className="flex justify-between items-center ">
          {theme === "dark" ? (
            <Link href={"/"}>
              <svg
                width="93"
                height="20"
                viewBox="0 0 93 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83335 1.6665V18.3332M14.1667 1.6665V18.3332M1.66669 9.99984H18.3334M1.66669 5.83317H5.83335M1.66669 14.1665H5.83335M14.1667 14.1665H18.3334M14.1667 5.83317H18.3334M3.48335 1.6665H16.5167C17.52 1.6665 18.3334 2.47985 18.3334 3.48317V16.5165C18.3334 17.5198 17.52 18.3332 16.5167 18.3332H3.48335C2.48004 18.3332 1.66669 17.5198 1.66669 16.5165V3.48317C1.66669 2.47985 2.48004 1.6665 3.48335 1.6665Z"
                  stroke="#FAFAFA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M30.2159 4.36364H33.25L35.1648 12.1818H35.3011L39.7955 4.36364H42.8295L40.8977 16H38.5114L39.7727 8.42614H39.6705L35.4205 15.9432H33.7898L32.0398 8.39773H31.9432L30.6705 16H28.2841L30.2159 4.36364ZM47.1538 16.1705C46.2637 16.1705 45.5269 15.9811 44.9436 15.6023C44.3602 15.2197 43.9493 14.6894 43.7106 14.0114C43.4758 13.3295 43.4322 12.536 43.5799 11.6307C43.7239 10.7367 44.0231 9.95455 44.4777 9.28409C44.9322 8.61364 45.5099 8.0928 46.2106 7.72159C46.9114 7.34659 47.7012 7.15909 48.5799 7.15909C49.4663 7.15909 50.2012 7.35038 50.7845 7.73295C51.3678 8.11174 51.7788 8.64205 52.0174 9.32386C52.2561 10.0057 52.3015 10.7992 52.1538 11.7045C52.0061 12.5947 51.703 13.375 51.2447 14.0455C50.7864 14.7159 50.2087 15.2386 49.5118 15.6136C48.8148 15.9848 48.0288 16.1705 47.1538 16.1705ZM47.3924 14.2955C47.8015 14.2955 48.1633 14.1799 48.4777 13.9489C48.7959 13.714 49.0591 13.3958 49.2674 12.9943C49.4796 12.589 49.6273 12.1307 49.7106 11.6193C49.794 11.1155 49.7996 10.6686 49.7277 10.2784C49.6557 9.88447 49.5042 9.57386 49.2731 9.34659C49.0459 9.11932 48.7334 9.00568 48.3356 9.00568C47.9265 9.00568 47.5629 9.12311 47.2447 9.35795C46.9265 9.58902 46.6633 9.9072 46.4549 10.3125C46.2466 10.7178 46.1008 11.178 46.0174 11.6932C45.9379 12.1932 45.9322 12.6402 46.0004 13.0341C46.0686 13.4242 46.2182 13.733 46.4493 13.9602C46.6803 14.1837 46.9947 14.2955 47.3924 14.2955ZM62.6414 7.27273L58.1357 16H55.4085L53.8119 7.27273H56.2778L57.0505 13.517H57.1414L59.988 7.27273H62.6414ZM62.7455 16L64.2001 7.27273H66.6205L65.166 16H62.7455ZM65.6603 6.13636C65.3004 6.13636 65.0031 6.01705 64.7682 5.77841C64.5372 5.53598 64.4425 5.24811 64.4841 4.91477C64.5258 4.57386 64.6887 4.28598 64.9728 4.05114C65.2569 3.8125 65.5788 3.69318 65.9387 3.69318C66.2985 3.69318 66.5921 3.8125 66.8194 4.05114C67.0466 4.28598 67.1413 4.57386 67.1035 4.91477C67.0656 5.24811 66.9046 5.53598 66.6205 5.77841C66.3402 6.01705 66.0201 6.13636 65.6603 6.13636ZM71.3794 16.1705C70.4855 16.1705 69.745 15.9886 69.1578 15.625C68.5707 15.2576 68.1578 14.7386 67.9192 14.0682C67.6844 13.3939 67.6446 12.5966 67.7999 11.6761C67.9514 10.7784 68.2563 9.99053 68.7147 9.3125C69.1768 8.63447 69.7563 8.10606 70.4533 7.72727C71.1503 7.34848 71.9268 7.15909 72.7828 7.15909C73.3586 7.15909 73.8794 7.25189 74.3453 7.4375C74.815 7.61932 75.2052 7.89583 75.5158 8.26705C75.8264 8.63447 76.0385 9.0947 76.1522 9.64773C76.2696 10.2008 76.2677 10.8485 76.1465 11.5909L76.0385 12.2557H68.6749L68.9078 10.7557H73.9987C74.0556 10.4072 74.0328 10.0985 73.9306 9.82955C73.8283 9.56061 73.6578 9.35038 73.4192 9.19886C73.1806 9.04356 72.887 8.96591 72.5385 8.96591C72.1825 8.96591 71.8491 9.05303 71.5385 9.22727C71.2279 9.40151 70.9666 9.63068 70.7544 9.91477C70.5461 10.1951 70.4116 10.5 70.351 10.8295L70.084 12.3182C70.0082 12.7765 70.0234 13.1572 70.1294 13.4602C70.2393 13.7633 70.4287 13.9905 70.6976 14.142C70.9666 14.2898 71.3075 14.3636 71.7203 14.3636C71.9893 14.3636 72.2412 14.3258 72.476 14.25C72.7147 14.1742 72.9268 14.0625 73.1124 13.9148C73.298 13.7633 73.4495 13.5758 73.5669 13.3523L75.7772 13.5C75.5726 14.0379 75.262 14.5076 74.8453 14.9091C74.4287 15.3068 73.9268 15.6174 73.3397 15.8409C72.7563 16.0606 72.1029 16.1705 71.3794 16.1705ZM81.2666 16L81.5166 14.5398L88.6814 6.39205H82.8461L83.187 4.36364H92.0961L91.8518 5.82386L84.6814 13.9716H90.5166L90.1757 16H81.2666Z"
                  fill="#FAFAFA"
                />
              </svg>
            </Link>
          ) : (
            <Link href={"/"}>
              <svg
                width="93"
                height="20"
                viewBox="0 0 93 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83335 1.6665V18.3332M14.1667 1.6665V18.3332M1.66669 9.99984H18.3334M1.66669 5.83317H5.83335M1.66669 14.1665H5.83335M14.1667 14.1665H18.3334M14.1667 5.83317H18.3334M3.48335 1.6665H16.5167C17.52 1.6665 18.3334 2.47985 18.3334 3.48317V16.5165C18.3334 17.5198 17.52 18.3332 16.5167 18.3332H3.48335C2.48004 18.3332 1.66669 17.5198 1.66669 16.5165V3.48317C1.66669 2.47985 2.48004 1.6665 3.48335 1.6665Z"
                  stroke="#4338CA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M30.2159 4.36364H33.25L35.1648 12.1818H35.3011L39.7955 4.36364H42.8295L40.8977 16H38.5114L39.7727 8.42614H39.6705L35.4205 15.9432H33.7898L32.0398 8.39773H31.9432L30.6705 16H28.2841L30.2159 4.36364ZM47.1538 16.1705C46.2637 16.1705 45.5269 15.9811 44.9436 15.6023C44.3602 15.2197 43.9493 14.6894 43.7106 14.0114C43.4758 13.3295 43.4322 12.536 43.5799 11.6307C43.7239 10.7367 44.0231 9.95455 44.4777 9.28409C44.9322 8.61364 45.5099 8.0928 46.2106 7.72159C46.9114 7.34659 47.7012 7.15909 48.5799 7.15909C49.4663 7.15909 50.2012 7.35038 50.7845 7.73295C51.3678 8.11174 51.7788 8.64205 52.0174 9.32386C52.2561 10.0057 52.3015 10.7992 52.1538 11.7045C52.0061 12.5947 51.703 13.375 51.2447 14.0455C50.7864 14.7159 50.2087 15.2386 49.5118 15.6136C48.8148 15.9848 48.0288 16.1705 47.1538 16.1705ZM47.3924 14.2955C47.8015 14.2955 48.1633 14.1799 48.4777 13.9489C48.7959 13.714 49.0591 13.3958 49.2674 12.9943C49.4796 12.589 49.6273 12.1307 49.7106 11.6193C49.794 11.1155 49.7996 10.6686 49.7277 10.2784C49.6557 9.88447 49.5042 9.57386 49.2731 9.34659C49.0459 9.11932 48.7334 9.00568 48.3356 9.00568C47.9265 9.00568 47.5629 9.12311 47.2447 9.35795C46.9265 9.58902 46.6633 9.9072 46.4549 10.3125C46.2466 10.7178 46.1008 11.178 46.0174 11.6932C45.9379 12.1932 45.9322 12.6402 46.0004 13.0341C46.0686 13.4242 46.2182 13.733 46.4493 13.9602C46.6803 14.1837 46.9947 14.2955 47.3924 14.2955ZM62.6414 7.27273L58.1357 16H55.4085L53.8119 7.27273H56.2778L57.0505 13.517H57.1414L59.988 7.27273H62.6414ZM62.7455 16L64.2001 7.27273H66.6205L65.166 16H62.7455ZM65.6603 6.13636C65.3004 6.13636 65.0031 6.01705 64.7682 5.77841C64.5372 5.53598 64.4425 5.24811 64.4841 4.91477C64.5258 4.57386 64.6887 4.28598 64.9728 4.05114C65.2569 3.8125 65.5788 3.69318 65.9387 3.69318C66.2985 3.69318 66.5921 3.8125 66.8194 4.05114C67.0466 4.28598 67.1413 4.57386 67.1035 4.91477C67.0656 5.24811 66.9046 5.53598 66.6205 5.77841C66.3402 6.01705 66.0201 6.13636 65.6603 6.13636ZM71.3794 16.1705C70.4855 16.1705 69.745 15.9886 69.1578 15.625C68.5707 15.2576 68.1578 14.7386 67.9192 14.0682C67.6844 13.3939 67.6446 12.5966 67.7999 11.6761C67.9514 10.7784 68.2563 9.99053 68.7147 9.3125C69.1768 8.63447 69.7563 8.10606 70.4533 7.72727C71.1503 7.34848 71.9268 7.15909 72.7828 7.15909C73.3586 7.15909 73.8794 7.25189 74.3453 7.4375C74.815 7.61932 75.2052 7.89583 75.5158 8.26705C75.8264 8.63447 76.0385 9.0947 76.1522 9.64773C76.2696 10.2008 76.2677 10.8485 76.1465 11.5909L76.0385 12.2557H68.6749L68.9078 10.7557H73.9987C74.0556 10.4072 74.0328 10.0985 73.9306 9.82955C73.8283 9.56061 73.6578 9.35038 73.4192 9.19886C73.1806 9.04356 72.887 8.96591 72.5385 8.96591C72.1825 8.96591 71.8491 9.05303 71.5385 9.22727C71.2279 9.40151 70.9666 9.63068 70.7544 9.91477C70.5461 10.1951 70.4116 10.5 70.351 10.8295L70.084 12.3182C70.0082 12.7765 70.0234 13.1572 70.1294 13.4602C70.2393 13.7633 70.4287 13.9905 70.6976 14.142C70.9666 14.2898 71.3075 14.3636 71.7203 14.3636C71.9893 14.3636 72.2412 14.3258 72.476 14.25C72.7147 14.1742 72.9268 14.0625 73.1124 13.9148C73.298 13.7633 73.4495 13.5758 73.5669 13.3523L75.7772 13.5C75.5726 14.0379 75.262 14.5076 74.8453 14.9091C74.4287 15.3068 73.9268 15.6174 73.3397 15.8409C72.7563 16.0606 72.1029 16.1705 71.3794 16.1705ZM81.2666 16L81.5166 14.5398L88.6814 6.39205H82.8461L83.187 4.36364H92.0961L91.8518 5.82386L84.6814 13.9716H90.5166L90.1757 16H81.2666Z"
                  fill="#4338CA"
                />
              </svg>
            </Link>
          )}
          <div className="flex gap-3 items-center relative">
            <button
              onClick={() => {
                setIsVisible(!isVisible);
              }}
              className="py-[6px] pl-4 border rounded-lg border-[#E4E4E7] flex items-center justify-center gap-2"
            >
              {theme === "dark" ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#18181B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              Genre
              <p className="text-sm w-10.25 h-5"></p>
            </button>
            <div className="py-[6px] px-4 flex gap-2.5 border rounded-lg border-[#E4E4E7] w-94  pl-3 pr-3">
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
                className={`w-144.25 bg-white border border-[#E4E4E7] rounded-lg min-h-[128] absolute z-2 top-13 p-3 ${search.length > 0 ? "visible" : "invisible"}`}
              >
                {movieSearch.slice(0, 5).map((movie) => (
                  <Link
                    href={`/details/${movie.id}`}
                    key={movie.id}
                    className="p-2 space-y-2 flex gap-4 "
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="h-25 w-16.75 object-cover transition-transform group-hover:scale-105 rounded-md"
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
            className=" border border-[#e4e4e7]  rounded-md w-8 h-8 flex justify-center items-center "
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon-icon lucide-moon "
              >
                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun-icon lucide-sun"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

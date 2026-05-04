"use client";
import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Navigation } from "@/app/components/Navigation";
import { PaginationDemo } from "@/app/components/Pagination";
import { Genres, Movie, MovieSearch } from "@/app/types";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [genres, setGenres] = useState<Genres[]>([]);

  const [movieSearch, setMovieSearch] = useState<MovieSearch[]>([]);
  const params = useParams();
  const searchId = decodeURIComponent(params.id as string);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
      )
      .then((res) => setGenres(res.data.genres));
  }, []);

  useEffect(() => {
    if (searchId) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${searchId}&api_key=d67d8bebd0f4ff345f6505c99e9d0289&page=${page}`,
        )
        .then((res) => {
          setMovieSearch(res.data.results);
          setTotalResults(res.data.total_results);
        });
    }
  }, [searchId, page]);

  return (
    <div>
      <Navigation />
      <div className="px-72 space-y-8 mt-15 ">
        <h1 className="text-[30px] font-semibold">Search results</h1>
        <div className="flex justify-end">
          <p className="text-[20px] font-semibold">
            {totalResults} results for "{searchId}"
          </p>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-wrap gap-4 w-[350px] h-[200px]">
            {genres.map((genre) => (
              <Link
                href={`/genre/${genre.id}`}
                key={genre.id}
                className="border cursor-pointer duration-300 h-6  text-xs font-semibold py-0.5 pl-2.5 pr-2 border-[#E4E4E7] rounded-full flex items-center gap-2  hover:bg-[#E4E4E7]"
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
            ))}
          </div>
          <div className="border-l-1 border border-[#E4E4E7] "></div>
          <div className="grid grid-cols-4 grid-rows-2 gap-10">
            {movieSearch.slice(0, 12).map((movie) => (
              <Card key={movie.id} upcom={movie} size="w-[310px]" />
            ))}
          </div>
        </div>
        <PaginationDemo page={page} setPage={setPage} />
      </div>
      <Footer />
    </div>
  );
}

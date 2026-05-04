"use client";
import Image from "next/image";
import { Navigation } from "@/app/components/Navigation";
import { Upcoming } from "@/app/components/Upcoming";

import { useEffect, useState } from "react";

import axios from "axios";
import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Movie } from "@/app/types";

import { title } from "process";
import { useParams } from "next/navigation";
import { Pagination } from "@/components/ui/pagination";
import { PaginationDemo } from "@/app/components/Pagination";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { type }: { type: "popular" | "upcoming" | "toprated" } = useParams();
  const [page, setPage] = useState(1);

  const titleChange = () => {
    if (type === "upcoming") {
      return <p>Upcoming</p>;
    } else if (type === "popular") {
      return <p>Popular</p>;
    } else if (type === "toprated") {
      return <p>Top Rated</p>;
    }
  };

  const PageInfo = {
    upcoming: {
      url: "/movie/upcoming",
      title: "Upcoming",
    },
    popular: {
      url: "/movie/",
      title: "popular",
    },
    "top-rated": {
      url: "/movie/top_rated",
      title: "top-rated",
    },
  };

  useEffect(() => {
    if (!type) return;

    axios
      .get(
        ` https://api.themoviedb.org/3/movie/${type === "toprated" ? "top_rated" : type}?api_key=d67d8bebd0f4ff345f6505c99e9d0289&page=${page}`,
      )
      .then((res) => setMovies(res.data.results));
  }, [type, page]);

  return (
    <div className="flex flex-col w-full">
      <Navigation />

      <div className="w-full h-full flex items-center flex-col">
        <div className="flex justify-start w-full px-80 h-60 items-end">
          <div className="flex justify-start w-full h-60 items-center  text-[24px] font-semibold">
            {titleChange()}
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-10">
          {movies.slice(0, 10).map((movie) => (
            <Card key={movie.id} upcom={movie} size="w-full" />
          ))}
        </div>
      </div>
      <PaginationDemo page={page} setPage={setPage} padding="px-66" />
      <Footer />
    </div>
  );
}

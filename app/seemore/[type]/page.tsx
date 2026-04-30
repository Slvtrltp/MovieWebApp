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

export default function Home() {
  const [movie, setMovie] = useState<Movie[]>([]);

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
    axios
      .get(
        `https://api.themoviedb.org/3${/movie/cgimnopu}?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
      )
      .then((res) => {
        setMovie(res.data.results);
      });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Navigation url="details/" />

      <div className="w-full h-full flex items-center flex-col">
        <div className="flex justify-start w-full px-80 h-60 items-end">
          <div className="flex justify-start w-full h-60 items-center  text-[24px] font-semibold">
            Upcoming
          </div>

          <a
            href="#"
            className="group relative inline-block transition-all duration-300"
          >
            Миний текст
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-10">
          {upcoming.slice(0, 10).map((upcom) => (
            <Card key={upcom.id} upcom={upcom} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

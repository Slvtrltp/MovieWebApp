"use client";
import Image from "next/image";
import { Navigation } from "@/app/components/Navigation";
import { Upcoming } from "@/app/components/Upcoming";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import { Genres, Movie } from "./types";
import axios from "axios";
import { Footer } from "./components/Footer";

export default function Home() {
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
      )
      .then((res) => {
        setUpcoming(res.data.results);
      });
  }, []);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => {
        setPopular(data.results);
      });
  }, []);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => {
        setTopRated(data.results);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <Navigation />
      <Upcoming />
      <div className=" w-full h-screen flex items-center flex-col ">
        <div className="flex justify-start w-full pl-72 h-60 items-center p-10 text-[24px] font-semibold">
          Upcoming
        </div>
        <div className="grid grid-cols-5 grid-rows-2  h-screen gap-10">
          {upcoming.slice(0, 10).map((upcom) => (
            <Card key={upcom.id} upcom={upcom} />
          ))}
        </div>
        <div className="flex justify-start w-full pl-72 h-60 items-center p-10 text-[24px] font-semibold">
          Popular
        </div>
        <div className="grid grid-cols-5 grid-rows-2  h-screen gap-10">
          {popular.slice(0, 10).map((upcom) => (
            <Card key={upcom.id} upcom={upcom} />
          ))}
        </div>
        <div className="flex justify-start w-full pl-72 h-60 items-center p-10 text-[24px] font-semibold">
          Top Rated
        </div>
        <div className="grid grid-cols-5 grid-rows-2  h-screen gap-10">
          {topRated.slice(0, 10).map((upcom) => (
            <Card key={upcom.id} upcom={upcom} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

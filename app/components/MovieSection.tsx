"use client";

import React from "react";

import Image from "next/image";

import { useEffect, useState } from "react";

import axios from "axios";

import Link from "next/link";
import { Movie } from "../types";
import { Card } from "./Card";

export const MovieSection = () => {
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
    <div className="w-full h-full flex items-center flex-col">
      <div className="flex justify-between px-72 w-full h-60 items-end">
        <div className="flex justify-start w-full  h-60 items-center  text-[24px] font-semibold">
          Upcoming
        </div>
        <div className="cursor-pointer pb-10 w-30 flex items-center gap-2">
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
                d="M3.33301 8.00016H12.6663M12.6663 8.00016L7.99967 3.3335M12.6663 8.00016L7.99967 12.6668"
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-10">
        {upcoming.slice(0, 10).map((upcom) => (
          <Card key={upcom.id} upcom={upcom} />
        ))}
      </div>
      <div className="flex justify-between px-72 w-full h-60 items-end">
        <div className="flex justify-start w-full  h-60 items-center  text-[24px] font-semibold">
          Popular
        </div>
        <div className="cursor-pointer pb-10 w-30 flex items-center gap-2">
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
                d="M3.33301 8.00016H12.6663M12.6663 8.00016L7.99967 3.3335M12.6663 8.00016L7.99967 12.6668"
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-10">
        {popular.slice(0, 10).map((upcom) => (
          <Card key={upcom.id} upcom={upcom} />
        ))}
      </div>
      <div className="flex justify-between px-72 w-full h-60 items-end">
        <div className="flex justify-start w-full  h-60 items-center  text-[24px] font-semibold">
          Top-Rated
        </div>
        <div className="cursor-pointer pb-10 w-30 flex items-center gap-2">
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
                d="M3.33301 8.00016H12.6663M12.6663 8.00016L7.99967 3.3335M12.6663 8.00016L7.99967 12.6668"
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-10">
        {topRated.slice(0, 10).map((upcom) => (
          <Card key={upcom.id} upcom={upcom} />
        ))}
      </div>
    </div>
  );
};

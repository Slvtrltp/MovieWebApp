"use client"; // Хэрэв Next.js ашиглаж байгаа бол заавал бичнэ
import React, { useEffect, useState } from "react";
import { Movie, MovieSearch } from "../types";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { Star } from "./Star";

export const Upcoming = () => {
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
      )
      .then((res) => {
        setUpcoming(res.data.results);
      });
  }, []);
  return (
    <div className="pt-6">
      <Swiper
        // Модулиудаа идэвхжүүлнэ
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0} // Слайд хоорондын зай
        slidesPerView={1} // Нэг удаа харагдах слайдны тоо
        navigation={true} // Сумнууд харуулах
        pagination={{ clickable: true }} // Доорх цэгүүд
        autoplay={{ delay: 5000 }} // Автоматаар гүйлгэх
        className="h-[800px] w-full object-cover"
      >
        {upcoming.slice(0, 5).map((trend) => (
          <SwiperSlide key={trend.id} className="relative w-full h-full">
            <img
              className="w-full h-[800px] absolute bg-center object-cover z-0 "
              src={`https://image.tmdb.org/t/p/original${trend.backdrop_path}`}
              alt=""
            />
            <div className="absolute bottom-0 left-0 pl-[140px] pt-[250px] z-10 inset-0 gap-4">
              <div>
                <p className="text-[18px] text-white">Now Playing:</p>
                <h1 className="text-[36px] font-bold text-white">
                  {trend.title}
                </h1>
                <Star
                  star={trend}
                  font="text-[18px]"
                  size="20px"
                  color="text-white"
                  tcolor="text-[#71717A]"
                  tfont="text-[16px]"
                />
              </div>
              <p className="w-[370px] text-white pb-4">{trend.overview} </p>
              <button className="flex bg-white items-center gap-2 py-2 px-4 rounded-lg ">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33301 2L12.6663 8L3.33301 14V2Z"
                    stroke="#18181B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Watch Trailer
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tailwind ашиглан Swiper-ийн сумны өнгийг өөрчлөх "Trick" */}
      <style jsx global>{`
        .swiper-button-next {
          color: #3b82f6 !important; /* Tailwind blue-500 */
        }
        .swiper-button-prev {
          color: #3b82f6 !important; /* Tailwind blue-500 */
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
        }
        .swiper-pagination-bullet {
          background: #888;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

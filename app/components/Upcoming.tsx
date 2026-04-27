"use client"; // Хэрэв Next.js ашиглаж байгаа бол заавал бичнэ
import React, { useEffect, useState } from "react";
import { Movie, MovieSearch } from "../types";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Upcoming = () => {
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      " https://api.themoviedb.org/3/trending/movie/day?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => {
        setUpcoming(data.results);
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
        className=""
      >
        {upcoming.map((trend) => (
          <SwiperSlide key={trend.id}>
            <img
              className="w-full h-[800px]"
              src={`https://image.tmdb.org/t/p/original${trend.backdrop_path}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tailwind ашиглан Swiper-ийн сумны өнгийг өөрчлөх "Trick" */}
      <style jsx global>{`
        .swiper-button-next,
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

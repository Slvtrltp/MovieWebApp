"use client";
import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Navigation } from "@/app/components/Navigation";
import { PaginationDemo } from "@/app/components/Pagination";
import { Morelike } from "@/app/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [more, setMore] = useState<Morelike[]>([]);
  const { id } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Хэрэв id нь "id" гэсэн текст байвал эсвэл хоосон бол хүсэлт явуулахгүй
    if (!id || id === "id") return;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=d67d8bebd0f4ff345f6505c99e9d0289&page=${page}`,
      )
      .then((res) => {
        setMore(res.data.results);
      })
      .catch((err) => {
        console.error("Дата татахад алдаа гарлаа:", err);
      });
  }, [id, page]); // id өөрчлөгдөх бүрд ажиллана
  return (
    <div>
      <Navigation />
      <div className="text-[30px] font-semibold px-80 pt-20">
        More like this
      </div>
      <div className="grid grid-cols-5 w-[2100px] w-fit px-70 mt-8 gap-11">
        {" "}
        {more.slice(0, 10).map((movie) => (
          <Card upcom={movie} key={movie.id} size="w-full" />
        ))}
      </div>
      <div className="px-80">
        <PaginationDemo page={page} setPage={setPage} />
      </div>
      <Footer />
    </div>
  );
}

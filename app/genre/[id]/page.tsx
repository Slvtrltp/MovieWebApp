"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Genres, Movie, MovieSearch } from "@/app/types";

import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";

import { Star } from "@/app/components/Star";
import { Navigation } from "@/app/components/Navigation";
import { PaginationDemo } from "@/app/components/Pagination";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [genres, setGenres] = useState<Genres[]>([]);

  const [page, setPage] = useState(1);
  const { id } = useParams();

  const toggleGenre = (genreId: number) => {
    setSelectedGenres(
      (prev) =>
        prev.includes(genreId)
          ? prev.filter((id) => id !== genreId) // Байвал хасна
          : [...prev, genreId], // Байхгүй бол нэмнэ
    );
    setPage(1); // Төрөл солигдоход хуудсыг 1 болгоно
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);
  useEffect(() => {
    const fetchMoviesByGenres = async () => {
      const genreString = selectedGenres.join(",");

      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: "d67d8bebd0f4ff345f6505c99e9d0289",
              with_genres: genreString,
              page: page,
            },
          },
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMoviesByGenres();
  }, [selectedGenres, page]);

  return (
    <div>
      <Navigation />
      <div className="px-72 space-y-8 mt-15 ">
        <h1 className="text-[30px] font-semibold">Search filter</h1>
        <div className="flex">
          <div className="flex flex-wrap gap-4 w-[350px] h-[350px]">
            {genres.map((genre) => {
              const isActive = selectedGenres.includes(genre.id); // Сонгогдсон эсэхийг шалгах
              return (
                <button
                  onClick={() => toggleGenre(genre.id)}
                  key={genre.id}
                  className={`border cursor-pointer duration-300  text-xs font-semibold py-0.5 pl-2.5 pr-2 border-[#E4E4E7] rounded-full flex items-center gap-1  ${
                    isActive
                      ? "bg-black text-white border-primary h-6" // bg-black-ийн оронд primary ашиглах
                      : "border-border text-foreground hover:bg-accent h-6"
                  }`}
                >
                  {genre.name}

                  {isActive && <span>✕</span>}
                  {/* Хасах тэмдэг харуулж болно */}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-4 grid-rows-2 gap-10">
            {movies.slice(0, 12).map((movie) => (
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

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
  const [totalResults, setTotalResults] = useState<number>(0);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres(
      (prev) =>
        prev.includes(genreId)
          ? prev.filter((id) => id !== genreId) // Байвал хасна
          : [...prev, genreId], // Байхгүй бол нэмнэ
    );
    setPage(1);
  };
  useEffect(() => {
    if (id) {
      const genreId = Number(id);

      // Өмнөх бүх сонголтыг арилгаж, зөвхөн одоогийн ID-г оноох
      setSelectedGenres([genreId]);

      setPage(1);
    }
  }, [id]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
      )
      .then((res) => setGenres(res.data.genres));
  }, []);

  // Navigation-аас шилжих үед: Өмнөх сонголтуудыг цэвэрлэж зөвхөн нэгийг идэвхжүүлнэ

  useEffect(() => {
    const fetchMoviesByGenres = async () => {
      // Хэрэв ямар ч төрөл сонгоогүй бол хоосон массив буцаахгүй байхын тулд
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
        setTotalResults(res.data.total_results);
      } catch (err) {
        console.error("Дата татахад алдаа гарлаа:", err);
      }
    };

    fetchMoviesByGenres();
  }, [selectedGenres, page]);
  return (
    <div>
      <Navigation />
      <div className="px-72 mt-15 ">
        <div className="flex">
          <p className="text-[20px] font-semibold">{totalResults} titles in</p>
        </div>
        <div className="flex gap-6">
          <div className="grid grid-cols-4 grid-rows-2 gap-10 pr-3 pt-23">
            {movies.slice(0, 12).map((movie) => (
              <Card key={movie.id} upcom={movie} size="w-[310px]" />
            ))}
          </div>
          <div className="border-l-1 border border-[#E4E4E7] "></div>
          <div>
            <h1 className="text-[30px] font-semibold">Search by genre</h1>
            <p className="pb-5">See lists of movies by genre</p>
            <div className="flex flex-wrap gap-4 w-[350px] h-[200px]">
              {genres.map((genre) => {
                const isActive = selectedGenres.includes(genre.id); // Сонгогдсон эсэхийг шалгах
                return (
                  <button
                    onClick={() => toggleGenre(genre.id)}
                    key={genre.id}
                    className={`h-6 border border-[#E4E4E7] rounded-full flex justify-center items-center cursor-pointer duration-300 text-xs font-semibold py-0.5 pl-2.5 pr-2 gap-1 ${
                      isActive
                        ? "bg-black text-white border-primary" // bg-black-ийн оронд primary ашиглах
                        : "border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    {genre.name}

                    {isActive && <span>✕</span>}
                    {/* Хасах тэмдэг харуулж болно */}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <PaginationDemo page={page} setPage={setPage} />
      </div>
      <Footer />
    </div>
  );
}

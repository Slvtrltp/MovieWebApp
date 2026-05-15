"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Genres, Movie } from "@/app/types";

import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";

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
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    );
    setPage(1);
  };
  useEffect(() => {
    if (id) {
      const genreId = Number(id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
        setTotalResults(res.data.total_results);
      } catch (err) {
        console.error("Дата татахад алдаа гарлаа:", err);
      }
    };

    fetchMoviesByGenres();
  }, [selectedGenres, page]);

  const selectedGenreNames = genres
    .filter((genre) => selectedGenres.includes(genre.id))
    .map((genre) => genre.name)
    .join(", ");

  return (
    <div>
      <Navigation />
      <div className="flex justify-center">
        <div className="container mt-15 ">
          <div className="flex">
            <p className="text-[20px] font-semibold">
              {totalResults} titles in {selectedGenreNames}
            </p>
          </div>
          <div className="flex gap-7">
            <div className="grid grid-cols-4 grid-rows-2 gap-10 pr-3 pt-23">
              {movies.slice(0, 12).map((movie) => (
                <Card key={movie.id} movie={movie} size="w-64" />
              ))}
            </div>
            <div className="border-l-1 border border-[#E4E4E7] "></div>
            <div>
              <h1 className="text-[30px] font-semibold">Search by genre</h1>
              <p className="pb-5">See lists of movies by genre</p>
              <div className="flex flex-wrap gap-4 w-[350px] h-[200px]">
                {genres.map((genre) => {
                  const isActive = selectedGenres.includes(genre.id);
                  return (
                    <button
                      onClick={() => toggleGenre(genre.id)}
                      key={genre.id}
                      className={`h-6 border border-[#E4E4E7] rounded-full flex justify-center items-center cursor-pointer duration-300 text-xs font-semibold py-0.5 pl-2.5 pr-2 gap-1 ${
                        isActive
                          ? "bg-black text-white border-primary"
                          : "border-border text-foreground hover:bg-accent"
                      }`}
                    >
                      {genre.name}

                      {isActive && <span>✕</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <PaginationDemo page={page} setPage={setPage} padding={""} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

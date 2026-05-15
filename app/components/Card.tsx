import { Star } from "./Star";
import { Morelike, Movie } from "../types";
import Link from "next/link";

type Props = {
  movie: Movie | Morelike;
  size: string;
};

export const Card = ({ movie, size }: Props) => {
  return (
    <Link
      href={`/details/${movie.id}`}
      className="w-full h-[480px] rounded-xl overflow-hidden shadow-lg dark:shadow-lg dark:shadow-md dark:shadow-[#4338CA]"
    >
      <div>
        <img
          className={`${size} h-[380px] object-fit rounded-xl`}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
        />
        <Star
          star={movie?.vote_average}
          font="text-[14px]"
          color="text-black"
          tfont="text-[12px]"
          size="14px"
          tcolor="text-[#71717A]"
        />
        <p className="pl-2">{movie.title}</p>
      </div>
    </Link>
  );
};

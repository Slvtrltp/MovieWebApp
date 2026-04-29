"use client";
import { Footer } from "@/app/components/Footer";
import { Navigation } from "@/app/components/Navigation";
import { Movie } from "@/app/types";
import axios from "axios";
import { Star } from "lucide-react";

import React, { useEffect, useState } from "react";

export default function Card() {
  const [movie, setMovie] = useState<Movie[]>([]);

  // useEffect(() => {
  //   axios.get{

  //   }
  // }, []);
  return (
    <div>
      <Navigation />
      <div className="container">
        <div>
          <div>
            <h1 className="text-[36px] font-semibold container">Wicked</h1>
            <p>2024.11.26 · PG · 2h 40m</p>
          </div>
          <div>
            <p>Rating</p>
            <Star />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

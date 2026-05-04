"use client";
import Image from "next/image";
import { Navigation } from "@/app/components/Navigation";
import { Upcoming } from "@/app/components/Upcoming";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import { Genres, Movie } from "./types";
import axios from "axios";
import { Footer } from "./components/Footer";
import Link from "next/link";
import { MovieSection } from "./components/MovieSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Navigation />
      <Upcoming />
      <MovieSection />
      <Footer />
    </div>
  );
}

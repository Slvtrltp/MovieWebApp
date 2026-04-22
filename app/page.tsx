import Image from "next/image";
import { Navigation } from "@/app/components/Navigation";

export default function Home() {
  return (
    <div className="w-[1440px] h-screen">
      <div>
        <Navigation placeHolder="Search" />
      </div>
    </div>
  );
}

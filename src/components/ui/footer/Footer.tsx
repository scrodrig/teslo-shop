import Link from "next/link";
import React from "react";
import { titleFont } from "@/config/fonts";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo
        </span>
        <span> |Shop </span>
        <span> &#169; {new Date().getFullYear()} </span>
      </Link>

    <Link href="/">
      Legal & Privacy
    </Link>


    <Link href="/">
      Locations
    </Link>

    </div>
  );
};

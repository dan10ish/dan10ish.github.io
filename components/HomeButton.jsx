"use client";

import { Home } from "lucide-react";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link href="/" className="home-button" aria-label="Home">
      <Home size={36}/>
    </Link>
  );
};

export default HomeButton;

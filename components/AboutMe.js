import Link from "next/link";
import { Library } from "lucide-react";

export default function AboutMe() {
  return (
    <section className="about">
      <p>
        A mechatronics engineer exploring machine learning, robotics and
        computer science.
      </p>
      <p>
        Check out my{" "}
        <Link href="/library" className="library-link">
          <Library size={14} />
          <span>Library</span>
        </Link>{" "}
        for my notes & resources I frequently reference.
      </p>
    </section>
  );
}

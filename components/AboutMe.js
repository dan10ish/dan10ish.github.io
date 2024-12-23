import Link from "next/link";
import { BookText, Library, Camera, FileText, Hammer } from "lucide-react";

export default function AboutMe() {
  return (
    <section className="about">
      <p>
        A mechatronics engineer exploring machine learning, robotics and
        computer science.
      </p>
      <div className="about-links">
        <Link href="/notes" className="about-link">
          <FileText size={16} />
          <span>Notes</span>
        </Link>
        <Link href="/photos" className="about-link">
          <Camera size={16} />
          <span>Photos</span>
        </Link>
        <Link href="/books" className="about-link">
          <BookText size={16} />
          <span>Books</span>
        </Link>
        <Link href="/resources" className="about-link">
          <Hammer size={16} />
          <span>Resources</span>
        </Link>
      </div>
    </section>
  );
}

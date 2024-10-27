import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="about">
      <p>
        A mechatronics engineer exploring machine learning, robotics and
        computer science.
      </p>
      <p>
        View some of my{" "}
        <Link href="/pics" className="photo-link">
          captures
        </Link>
        .
      </p>
    </section>
  );
}

import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="about">
      <p>
        A mechatronics engineer exploring machine learning, robotics and
        computer science.
      </p>
      <p>
        Check out my <Link href="/library">library</Link> for resources I
        frequently reference.
      </p>
    </section>
  );
}

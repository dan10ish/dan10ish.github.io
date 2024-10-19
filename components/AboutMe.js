import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="about">
      <p>
        A mechatronics engineer exploring machine learning, robotics and
        computer science.
      </p>
      <p>
        This website serves as a log of things I've learned and built overtime,
        as well as{" "}
        <span className="about-link">
          <Link href="/pics">pictures</Link>
        </span>{" "}
        I've captured.
      </p>
    </section>
  );
}

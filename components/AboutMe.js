"use client";

import { memo } from "react";
import Link from "next/link";
import { BookText, Camera, FileText, Hammer } from "lucide-react";

const AboutLink = memo(({ href, icon: Icon, text }) => (
  <Link href={href} className="about-link">
    <Icon size={16} />
    <span>{text}</span>
  </Link>
));

AboutLink.displayName = "AboutLink";

const links = [
  { href: "/notes", icon: FileText, text: "Notes" },
  { href: "/photos", icon: Camera, text: "Photos" },
  { href: "/books", icon: BookText, text: "Books" },
  { href: "/resources", icon: Hammer, text: "Resources" },
];

const AboutMe = () => {
  return (
    <section className="about">
      <p>
        A mechatronics engineer exploring machine learning, robotics and
        computer science.
      </p>
      <div className="about-links">
        {links.map(({ href, icon, text }) => (
          <AboutLink key={href} href={href} icon={icon} text={text} />
        ))}
      </div>
    </section>
  );
};

export default memo(AboutMe);

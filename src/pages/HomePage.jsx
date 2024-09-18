import React from "react";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";
import Projects from "./Projects";

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="header">
        <Link to="/">
          <h1>Danish</h1>
        </Link>
      </div>
      <div className="socials">
        <div>
          x.com/
          <a
            href="https://x.com/dan10ish"
            target="_blank"
            rel="noopener noreferrer"
          >
            dan10ish
          </a>
        </div>
        <div>
          github.com/
          <a
            href="https://github.com/dan10ish"
            target="_blank"
            rel="noopener noreferrer"
          >
            dan10ish
          </a>
        </div>
        <div>
          <a
            href="mailto:dan10ish@icloud.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            dan10ish@icloud.com
          </a>
        </div>
      </div>
      <div className="about">
        <div>
          <p>
            I'm a mechatronics engineer from Mumbai exploring robotics, machine
            learning and computer science.
          </p>
        </div>
        <div>
          <p>This site holds my work and writings.</p>
        </div>
      </div>
      <div className="blog-list">
        <h2>Posts</h2>
        <BlogList />
      </div>
      <div className="project-list">
        <h2>Projects</h2>
        <Projects />
      </div>
    </div>
  );
}

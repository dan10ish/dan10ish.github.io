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
      <div className="list">
        <h2>Impact</h2>
        <ul>
          <li>
            <a
              href="https://www.youtube.com/watch?v=3qHkcs3kG44"
              target="_blank"
              rel="noopener noreferrer"
            >
              JRE #1309
            </a>{" "}
            - Joe & Naval
          </li>
          <li>
            <a
              href="https://jxnl.co/writing/2024/06/01/advice-to-young-people/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Advice to Young People
            </a>{" "}
            - Jason Liu
          </li>
          <li>
            <a
              href="https://blog.samaltman.com/how-to-be-successful"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to Be Successful
            </a>{" "}
            - Sam Altman
          </li>
          <li>
            <a
              href="https://eugeneyan.com/writing/simplicity/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Simplicity is An Advantage but Sadly Complexity Sells Better
            </a>{" "}
            - Eugene Yan
          </li>
        </ul>
      </div>
    </div>
  );
}

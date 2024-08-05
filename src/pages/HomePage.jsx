import { data } from "../data/data";
import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Footer = lazy(() => import("../components/Footer"));

const HomePage = () => {
  const sortedData = React.useMemo(
    () => [...data].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );

  return (
    <div className="homepage">
      <div className="title">
        <a href="https://dan10ish.github.io">
          <h1>Danish</h1>
        </a>
      </div>
      <div className="about-me">
        <div className="about-me-one">
          I am a mechatronics engineer exploring the intersection of robotics,
          computer science and machine learning.
        </div>
        <div>This site holds my work and writings.</div>
      </div>
      <ul className="list">
        {sortedData.map((item) => {
          const year = format(new Date(item.date), "yyyy");
          const tag = item.tags[0];
          return (
            <li key={item.id} className="list-item">
              {item.type === "blog" ? (
                <Link to={`/blog/${item.fileName}`}>
                  <div className="item-title">
                    <h2>{item.title}</h2>
                  </div>
                  <div className="item-rest">
                    {tag} ~ {year}
                  </div>
                </Link>
              ) : (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <div className="item-title">{item.title}</div>
                  <div className="item-rest">
                    {tag} ~ {year}
                  </div>
                </a>
              )}
            </li>
          );
        })}
      </ul>
      <div className="wait">
        <div className="loader"></div>
        <div className="wait-text">Let me cook 🧑🏼‍🍳</div>
      </div>
      <div className="homepage-footer">
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;

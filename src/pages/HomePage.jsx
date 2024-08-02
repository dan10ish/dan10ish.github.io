import { data } from "../data/data";
import React, { lazy, Suspense, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Filter from "../components/Filter";

const Footer = lazy(() => import("../components/Footer"));

const MemoizedFilter = React.memo(Filter);

const HomePage = () => {
  const [filter, setFilter] = useState("all");

  const sortedData = useMemo(
    () => [...data].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );

  const filteredData = useMemo(() => {
    if (filter === "all") return sortedData;
    return sortedData.filter((item) => item.type === filter);
  }, [sortedData, filter]);

  const onFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const renderListItem = useCallback((item) => {
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
  }, []);

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
      <MemoizedFilter activeFilter={filter} onFilterChange={onFilterChange} />
      <ul className="list">{filteredData.map(renderListItem)}</ul>
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

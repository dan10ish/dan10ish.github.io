import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { data } from "../data/data";
import { format } from "date-fns";

export default function BlogList() {
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    data.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet);
  }, []);

  const filteredData = useMemo(() => {
    if (selectedTags.length === 0) return data;
    return data.filter((item) =>
      item.tags.some((tag) => selectedTags.includes(tag))
    );
  }, [selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const sortedData = useMemo(
    () => [...filteredData].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [filteredData]
  );

  return (
    <div className="bloglist">
      <div className="tag-filter">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={selectedTags.includes(tag) ? "active" : ""}
          >
            {tag}
          </button>
        ))}
      </div>
      <ul>
        {sortedData.map((item) => {
          const year = format(new Date(item.date), "dd MMM yyyy");
          return (
            <li key={item.id} className="list-item">
              <Link to={`/blog/${item.fileName}`}>
                <div className="item-rest">{year}</div>
                <div className="item-title">
                  <h2>{item.title}</h2>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

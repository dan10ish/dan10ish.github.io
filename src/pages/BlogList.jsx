import React from "react";
import { Link } from "react-router-dom";
import { data } from "../data/data";
import { format } from "date-fns";

export default function BlogList() {
  const sortedData = React.useMemo(
    () => [...data].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );

  return (
    <div className="bloglist">
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

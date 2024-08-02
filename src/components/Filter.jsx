import React from "react";

const FilterButton = React.memo(({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`filter-button ${active ? "active" : ""}`}
  >
    {children}
  </button>
));

const Filter = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="filter-container">
      <FilterButton
        active={activeFilter === "all"}
        onClick={() => onFilterChange("all")}
      >
        All
      </FilterButton>
      <FilterButton
        active={activeFilter === "blog"}
        onClick={() => onFilterChange("blog")}
      >
        Blogs
      </FilterButton>
      <FilterButton
        active={activeFilter === "project"}
        onClick={() => onFilterChange("project")}
      >
        Projects
      </FilterButton>
    </div>
  );
};

export default React.memo(Filter);

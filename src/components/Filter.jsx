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
        [all]
      </FilterButton>
      <FilterButton
        active={activeFilter === "blog"}
        onClick={() => onFilterChange("blog")}
      >
        [blogs]
      </FilterButton>
      <FilterButton
        active={activeFilter === "project"}
        onClick={() => onFilterChange("project")}
      >
        [projects]
      </FilterButton>
    </div>
  );
};

export default React.memo(Filter);

"use client";

import { useState, useEffect } from "react";
import { books, resources } from "@/lib/library-data";
import ButtonsContainer from "@/components/ButtonsContainer";
import { Treemap, ResponsiveContainer } from "recharts";
import { RefreshCw } from "lucide-react";

const treemapData = [
  {
    name: "Meta Platforms Inc",
    ticker: "META",
    value: 33.86,
    color: "#2563eb",
  },
  { name: "Apple Inc", ticker: "AAPL", value: 14.96, color: "#4338ca" },
  { name: "Amazon.com Inc", ticker: "AMZN", value: 11.06, color: "#be185d" },
  {
    name: "Clean Science & Technology Ltd",
    ticker: "CLEAN",
    value: 11.03,
    color: "#15803d",
  },
  {
    name: "Jindal Steel & Power Ltd",
    ticker: "JINDALSTEL",
    value: 8.98,
    color: "#b11b1b",
  },
  { name: "Nvidia Corporation", ticker: "NVDA", value: 5.85, color: "#7c3aed" },
  {
    name: "Tata Motors Ltd",
    ticker: "TATAMOTORS",
    value: 5.3,
    color: "#0369a1",
  },
  {
    name: "Taiwan Semiconductor",
    ticker: "TSM",
    value: 4.21,
    color: "#c026d3",
  },
  {
    name: "Microsoft Corporation",
    ticker: "MSFT",
    value: 3.31,
    color: "#0d9488",
  },
  {
    name: "Advanced Micro Devices",
    ticker: "AMD",
    value: 1.43,
    color: "#ea580c",
  },
];

const TreemapSkeleton = () => {
  return (
    <div className="skeleton-t" style={{ height: "350px", width: "100%" }}>
      <div className="skeleton-img-t" style={{ height: "100%", width: "100%" }}>
        <div className="shimmer-t">
          <div className="loading-tree">
            <RefreshCw className="spin" />
            <span>Loading</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomTreemap = () => {
  return (
    <div className="treemap-container">
      <ResponsiveContainer width="100%" height={350}>
        <Treemap
          data={treemapData}
          dataKey="value"
          ratio={4 / 3}
          animationDuration={0}
          content={({ root }) => {
            if (!root || !root.children) return null;

            return root.children.map((node, index) => {
              const { x, y, width, height, color } = node;
              const ticker = treemapData[index].ticker;

              const fontSize = Math.max(
                Math.min(width / ticker.length, height / 2, 14),
                8,
              );
              const textX = x + width / 2;
              const textY = y + height / 2;

              return (
                <g key={index}>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={color}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#fff"
                    fontSize={fontSize}
                    fontWeight="500"
                    style={{ pointerEvents: "none" }}
                  >
                    {ticker}
                  </text>
                </g>
              );
            });
          }}
        />
      </ResponsiveContainer>
    </div>
  );
};

const FinancePage = () => {
  const [touchedBook, setTouchedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const financeBooks = books.filter((book) => book.tags.includes("Finance"));
  const financeResources = resources.filter(
    (resource) =>
      resource.tags?.includes("Finance") ||
      resource.title.toLowerCase().includes("finance"),
  );

  return (
    <main>
      <div className="domain-header">
        <h2>Finance</h2>
      </div>

      <div className="portfolio-viz">
        <div className="treemap-container" style={{ overflow: "hidden" }}>
          {isLoading ? <TreemapSkeleton /> : <CustomTreemap />}
        </div>
      </div>

      {financeBooks.length > 0 && (
        <div className="books-grid">
          {financeBooks.map((book) => (
            <div
              key={book.title}
              className={`book-card ${touchedBook === book.title ? "touch-active" : ""}`}
              onTouchStart={() => setTouchedBook(book.title)}
              onTouchEnd={() => setTouchedBook(null)}
            >
              <div
                className="book-cover"
                style={{
                  "--book-color": book.coverColor,
                  color: "#ffffff",
                }}
              >
                <div
                  className="book-spine"
                  style={{ backgroundColor: book.coverColor }}
                />
                <div className="book-spine-edge" />
                <div className="book-content">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                </div>
                <div className="book-right-edge" />
              </div>
            </div>
          ))}
        </div>
      )}

      {financeResources.length > 0 && (
        <div className="resources-grid">
          {financeResources.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card"
              data-category={resource.category}
            >
              <h3 className="resource-title">{resource.title}</h3>
              <span className="resource-category">{resource.category}</span>
            </a>
          ))}
        </div>
      )}

      <ButtonsContainer />
    </main>
  );
};

export default FinancePage;

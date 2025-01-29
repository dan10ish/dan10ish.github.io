"use client";

import { useState, useEffect } from "react";
import { Treemap, ResponsiveContainer } from "recharts";
import { RefreshCw, Info } from "lucide-react";
import ButtonsContainer from "@/components/ButtonsContainer";

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

const TreemapSkeleton = () => (
  <div className="skeleton-t" style={{ height: "450px", width: "100%" }}>
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

const CustomTreemap = () => {
  return (
    <div className="treemap-container">
      <ResponsiveContainer width="100%" height={450}>
        <Treemap
          data={treemapData}
          dataKey="value"
          ratio={4 / 3}
          animationDuration={0}
          content={({ root }) => {
            if (!root?.children) return null;

            return root.children.map((node, index) => {
              const { x, y, width, height, color } = node;
              const stock = treemapData[index];

              const fontSize = Math.max(
                Math.min(width / stock.ticker.length, height / 2, 14),
                10,
              );
              const textX = x + width / 2;
              const textY = y + height / 2;

              return (
                <g key={index} className="treemap-node">
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
                  >
                    {stock.ticker}
                  </text>
                </g>
              );
            });
          }}
        />
      </ResponsiveContainer>
      <p className="treemap-caption">
        <Info size={15} /> Portfolio
      </p>
    </div>
  );
};

const FinancePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <div className="domain-header">
        <h2>Finance</h2>
        <span className="wip-badge domain-wip">Work In Progress</span>
      </div>
      <div className="portfolio-viz">
        <div className="treemap-container" style={{ overflow: "hidden" }}>
          {isLoading ? <TreemapSkeleton /> : <CustomTreemap />}
        </div>
      </div>
      <ButtonsContainer />
    </main>
  );
};

export default FinancePage;

"use client";

import { useState, useEffect, memo } from "react";

const ContributionCell = memo(({ count, onHover, onLeave }) => {
  const level =
    count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4;

  return (
    <div
      className={`contribution-cell level-${level}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    />
  );
});

ContributionCell.displayName = "ContributionCell";

const ContributionWeek = memo(({ data, showTooltip, hideTooltip }) => (
  <div className="contribution-week">
    {data.map((day, index) => (
      <ContributionCell
        key={day.date || index}
        count={day.count || 0}
        onHover={(e) => day.date && showTooltip(e, day)}
        onLeave={hideTooltip}
      />
    ))}
  </div>
));

ContributionWeek.displayName = "ContributionWeek";

const DAYS_IN_WEEK = 7;
const WEEKS_COUNT = 16;
const API_URL =
  "https://github-contributions-api.jogruber.de/v4/dan10ish?y=last";
const CACHE_KEY = "github-contributions";
const CACHE_TIME_KEY = "github-contributions-time";
const CACHE_DURATION = 3600000; // 1 hour

const GithubContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const loadContributions = async () => {
      // Try loading from cache first
      const cached = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (cached && cacheTime && now - parseInt(cacheTime) < CACHE_DURATION) {
        setContributions(JSON.parse(cached));
        return;
      }

      try {
        const res = await fetch(API_URL, {
          cache: "force-cache",
          next: { revalidate: 3600 },
        });
        const data = await res.json();

        if (data?.contributions) {
          const daysToShow = DAYS_IN_WEEK * WEEKS_COUNT;
          const recentContributions = data.contributions
            .slice(-daysToShow)
            .map((day) => ({
              date: day.date,
              count: day.count,
            }));

          // Pad with empty days if needed
          if (recentContributions.length < daysToShow) {
            const emptyDays = Array(
              daysToShow - recentContributions.length,
            ).fill({ count: 0, date: null });
            setContributions(emptyDays.concat(recentContributions));
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify(emptyDays.concat(recentContributions)),
            );
          } else {
            setContributions(recentContributions);
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify(recentContributions),
            );
          }
          localStorage.setItem(CACHE_TIME_KEY, now.toString());
        }
      } catch (error) {
        // On error, create empty grid
        const emptyDays = Array(DAYS_IN_WEEK * WEEKS_COUNT).fill({
          count: 0,
          date: null,
        });
        setContributions(emptyDays);
      }
    };

    loadContributions();
  }, []);

  const showTooltip = (e, day) => {
    if (!day?.date) return;

    const rect = e.target.getBoundingClientRect();
    const date = new Date(day.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    setTooltip({
      text: `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formattedDate}`,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const weeks = [];
  for (let i = 0; i < WEEKS_COUNT; i++) {
    weeks.push(contributions.slice(i * DAYS_IN_WEEK, (i + 1) * DAYS_IN_WEEK));
  }

  return (
    <div className="contributions-wrapper">
      <div
        className="contributions-grid"
        style={{ "--week-count": WEEKS_COUNT }}
      >
        {weeks.map((week, index) => (
          <ContributionWeek
            key={index}
            data={week}
            showTooltip={showTooltip}
            hideTooltip={() => setTooltip(null)}
          />
        ))}
      </div>
      {tooltip && (
        <div
          className="contribution-tooltip"
          style={{
            transform: "translateX(-50%) translateY(-100%)",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default memo(GithubContributions);

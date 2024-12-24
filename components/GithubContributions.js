"use client";

import { useState, useEffect, memo } from "react";

const ContributionCell = memo(({ count, date }) => {
  const [tooltipText, setTooltipText] = useState("");
  const level =
    count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4;

  useEffect(() => {
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
      setTooltipText(
        `${count} contribution${count !== 1 ? "s" : ""} on ${formattedDate}`,
      );
    }
  }, [count, date]);

  return (
    <div className="relative">
      <div className={`contribution-cell level-${level}`} />
      {tooltipText && <div className="contribution-tooltip">{tooltipText}</div>}
    </div>
  );
});

ContributionCell.displayName = "ContributionCell";

const ContributionWeek = memo(({ data }) => (
  <div className="contribution-week">
    {data.map((day, index) => (
      <ContributionCell
        key={day.date || index}
        count={day.count || 0}
        date={day.date}
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

  useEffect(() => {
    const loadContributions = async () => {
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
        const emptyDays = Array(DAYS_IN_WEEK * WEEKS_COUNT).fill({
          count: 0,
          date: null,
        });
        setContributions(emptyDays);
      }
    };

    loadContributions();
  }, []);

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
          <ContributionWeek key={index} data={week} />
        ))}
      </div>
    </div>
  );
};

export default memo(GithubContributions);

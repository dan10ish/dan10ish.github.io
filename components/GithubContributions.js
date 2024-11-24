"use client";

import { useState, useEffect, useCallback } from "react";

const DAYS_IN_WEEK = 7;
const MOBILE_WEEKS = 20;
const DESKTOP_WEEKS = 26;

const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

const GithubContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const today = new Date();
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);

        const query = `query {
          user(login: "dan10ish") {
            contributionsCollection(from: "${lastYear.toISOString()}", to: "${today.toISOString()}") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }`;

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "dan10ish-github-io",
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        if (!data.data) {
          throw new Error("No data received from GitHub");
        }

        const allDays =
          data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
            (week) => week.contributionDays
          );

        const daysToShow =
          DAYS_IN_WEEK * (isMobile ? MOBILE_WEEKS : DESKTOP_WEEKS);
        const recentDays = allDays.slice(-daysToShow);

        if (recentDays.length < daysToShow) {
          const emptyDays = Array(daysToShow - recentDays.length).fill({
            contributionCount: 0,
            date: null,
          });
          setContributions(emptyDays.concat(recentDays));
        } else {
          setContributions(recentDays);
        }

        setError(null);
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
        setError(error.message);
        setContributions([]);
      }
    };

    fetchContributions();
  }, [isMobile]);

  const showTooltip = useCallback((e, day) => {
    if (!day?.date) return;

    const rect = e.target.getBoundingClientRect();
    const date = new Date(day.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    });

    const contributionText = `${day.contributionCount} ${
      day.contributionCount === 1 ? "contribution" : "contributions"
    } on ${formattedDate.split(" ").reverse().join(" ")}`;

    const tooltipWidth = 200;
    const tooltipHeight = 40;
    const padding = 36;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = rect.left + rect.width / 2;
    let y = rect.top;

    if (x - tooltipWidth / 2 < padding) {
      x = tooltipWidth / 2 + padding;
    } else if (x + tooltipWidth / 2 > viewportWidth - padding) {
      x = viewportWidth - tooltipWidth / 2 - padding;
    }

    if (y - tooltipHeight < padding) {
      y = rect.bottom + tooltipHeight;
    }

    setTooltip({
      text: contributionText,
      x,
      y,
      position: y === rect.bottom + tooltipHeight ? "bottom" : "top",
    });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(null);
  }, []);

  if (error) {
    return (
      <div className="contributions-wrapper">
        <div className="contributions-error">
          Failed to load contributions. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="contributions-wrapper">
      <div
        className="contributions-grid"
        style={{
          "--week-count": isMobile ? MOBILE_WEEKS : DESKTOP_WEEKS,
        }}
      >
        {Array.from({ length: isMobile ? MOBILE_WEEKS : DESKTOP_WEEKS }).map(
          (_, weekIndex) => (
            <div key={weekIndex} className="contribution-week">
              {Array.from({ length: DAYS_IN_WEEK }).map((_, dayIndex) => {
                const contribution =
                  contributions[weekIndex * DAYS_IN_WEEK + dayIndex];
                return (
                  <div
                    key={dayIndex}
                    className={`contribution-cell ${
                      contribution?.date
                        ? `level-${Math.min(4, contribution.contributionCount)}`
                        : "level-0"
                    }`}
                    onMouseEnter={(e) =>
                      contribution?.date && showTooltip(e, contribution)
                    }
                    onMouseLeave={hideTooltip}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      contribution?.date && showTooltip(e, contribution);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      hideTooltip();
                    }}
                  />
                );
              })}
            </div>
          )
        )}
      </div>
      {tooltip && (
        <div
          className="contribution-tooltip"
          style={{
            transform:
              tooltip.position === "bottom"
                ? "translateX(-50%)"
                : "translateX(-50%) translateY(-100%)",
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

export default GithubContributions;

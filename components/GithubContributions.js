"use client";

import { useState, useEffect, useCallback } from "react";

const DAYS_IN_WEEK = 7;
const MOBILE_WEEKS = 20;
const DESKTOP_WEEKS = 26;

const GithubContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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
        const query = `query {
          user(login: "dan10ish") {
            contributionsCollection {
              contributionCalendar {
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
            Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const { data } = await response.json();
        const days =
          data.user.contributionsCollection.contributionCalendar.weeks
            .flatMap((week) => week.contributionDays)
            .slice(-(DAYS_IN_WEEK * (isMobile ? MOBILE_WEEKS : DESKTOP_WEEKS)));

        setContributions(days);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContributions();
  }, [isMobile]);

  const showTooltip = useCallback((e, day) => {
    const rect = e.target.getBoundingClientRect();
    const date = new Date(day.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const contributionText =
      day.contributionCount === 1 ? "contribution" : "contributions";

    const x = rect.left + rect.width / 2;
    const y = rect.top;

    const viewportWidth = window.innerWidth;
    const tooltipWidth = 250;

    let adjustedX = x;
    if (x - tooltipWidth / 2 < 0) {
      adjustedX = tooltipWidth / 2;
    } else if (x + tooltipWidth / 2 > viewportWidth) {
      adjustedX = viewportWidth - tooltipWidth / 2;
    }

    setTooltip({
      text: `${day.contributionCount} ${contributionText} on ${formattedDate}`,
      x: adjustedX,
      y: y,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(null);
  }, []);

  const weeksToShow = isMobile ? MOBILE_WEEKS : DESKTOP_WEEKS;

  return (
    <div className="contributions-wrapper">
      <div className="contributions-grid">
        {Array.from({ length: weeksToShow }).map((_, weekIndex) => (
          <div key={weekIndex} className="contribution-week">
            {Array.from({ length: DAYS_IN_WEEK }).map((_, dayIndex) => {
              const contribution =
                contributions[weekIndex * DAYS_IN_WEEK + dayIndex];
              return (
                <div
                  key={dayIndex}
                  className={`contribution-cell ${
                    contribution
                      ? `level-${Math.min(4, contribution.contributionCount)}`
                      : "level-0"
                  }`}
                  onMouseEnter={(e) =>
                    contribution && showTooltip(e, contribution)
                  }
                  onMouseLeave={hideTooltip}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    contribution && showTooltip(e, contribution);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    hideTooltip();
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      {tooltip && (
        <div
          className="contribution-tooltip"
          style={{
            transform: `translateX(-50%) translateY(-100%)`,
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

"use client";

import { useState, useEffect, useCallback } from "react";

const DAYS_IN_WEEK = 7;
const MOBILE_WEEKS = 16;
const DESKTOP_WEEKS = 16;

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
        const response = await fetch(
          "https://github-contributions-api.jogruber.de/v4/dan10ish?y=last"
        );
        const data = await response.json();

        if (!data?.contributions) {
          throw new Error("No contribution data found");
        }

        const contributionData = data.contributions.map((day) => ({
          date: day.date,
          contributionCount: day.count,
        }));

        const daysToShow =
          DAYS_IN_WEEK * (isMobile ? MOBILE_WEEKS : DESKTOP_WEEKS);
        const recentDays = contributionData.slice(-daysToShow);

        if (recentDays.length < daysToShow) {
          const emptyDays = Array(daysToShow - recentDays.length).fill({
            contributionCount: 0,
            date: null,
          });
          setContributions(emptyDays.concat(recentDays));
        } else {
          setContributions(recentDays);
        }
      } catch (error) {
        const daysToShow =
          DAYS_IN_WEEK * (isMobile ? MOBILE_WEEKS : DESKTOP_WEEKS);
        const emptyDays = Array(daysToShow).fill({
          contributionCount: 0,
          date: null,
        });
        setContributions(emptyDays);
      }
    };

    fetchContributions();
    const interval = setInterval(fetchContributions, 3600000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const getContributionLevel = useCallback((count) => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  }, []);

  const showTooltip = useCallback((e, day) => {
    if (!day?.date) return;

    const rect = e.target.getBoundingClientRect();
    const date = new Date(day.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    const tooltipWidth = 200;
    const tooltipHeight = 40;
    const padding = 22;
    const viewportWidth = window.innerWidth;

    let x = rect.left + rect.width / 2;
    let y = rect.top;

    const wouldGoOffRight = x + tooltipWidth / 2 > viewportWidth - padding;
    const wouldGoOffLeft = x - tooltipWidth / 2 < padding;

    if (wouldGoOffRight) {
      x = viewportWidth - tooltipWidth / 2 - padding;
    } else if (wouldGoOffLeft) {
      x = tooltipWidth / 2 + padding;
    }

    if (y - tooltipHeight < padding) {
      y = rect.bottom + 10;
    }

    setTooltip({
      text: `${day.contributionCount} ${
        day.contributionCount === 1 ? "contribution" : "contributions"
      } on ${formattedDate.split(" ").reverse().join(" ")}`,
      x,
      y,
      position: y === rect.bottom + 10 ? "bottom" : "top",
    });
  }, []);

  const hideTooltip = useCallback(() => setTooltip(null), []);

  return (
    <div className="contributions-wrapper">
      <div
        className="contributions-grid"
        style={{ "--week-count": isMobile ? MOBILE_WEEKS : DESKTOP_WEEKS }}
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
                        ? `level-${getContributionLevel(
                            contribution.contributionCount
                          )}`
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

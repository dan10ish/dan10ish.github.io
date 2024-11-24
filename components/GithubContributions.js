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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (!token) {
        console.error("GitHub token not found");
        return;
      }

      try {
        const today = new Date();
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query UserContributions($username: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $username) {
                  contributionsCollection(from: $from, to: $to) {
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
              }
            `,
            variables: {
              username: "dan10ish",
              from: lastYear.toISOString(),
              to: today.toISOString(),
            },
          }),
        });

        const { data } = await response.json();

        if (!data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
          throw new Error("No contribution data found");
        }

        const allDays =
          data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
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
      } catch (error) {
        console.error("Error fetching contributions:", error);
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
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
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
    const padding = 25;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = rect.left + rect.width / 2;
    let y = rect.top;

    const wouldGoOffRight = x + tooltipWidth / 2 > viewportWidth - padding;
    const wouldGoOffLeft = x - tooltipWidth / 2 < padding;
    const wouldGoOffTop = y - tooltipHeight - 10 < padding;
    const wouldGoOffBottom =
      rect.bottom + tooltipHeight + 10 > viewportHeight - padding;

    if (wouldGoOffRight) {
      x = viewportWidth - tooltipWidth / 2 - padding;
    } else if (wouldGoOffLeft) {
      x = tooltipWidth / 2 + padding;
    }

    if (wouldGoOffTop && !wouldGoOffBottom) {
      y = rect.bottom + 10;
    } else {
      y = rect.top - 10;
    }

    const contributionText = `${day.contributionCount} ${
      day.contributionCount === 1 ? "contribution" : "contributions"
    } on ${formattedDate.split(" ").reverse().join(" ")}`;

    setTooltip({
      text: contributionText,
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

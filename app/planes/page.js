"use client";

import { useState, useEffect } from "react";
import {
  Info,
  X,
  Circle,
  Plane,
  Navigation2,
  Timer,
  Lock,
  Shield,
  Award,
  BarChart3,
  RefreshCw,
  Clock,
  Compass,
  Palmtree,
  Cloud,
  Moon,
} from "lucide-react";
import ButtonsContainer from "@/components/ButtonsContainer";

export default function PlanesPage() {
  const [showInfo, setShowInfo] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.infiniteflight.com/public/v2/users",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_INFINITE_FLIGHT_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            discourseNames: ["dan7sh"],
          }),
        },
      );

      const data = await response.json();
      if (data.errorCode !== 0 || !data.result?.length) {
        throw new Error("Failed to fetch stats");
      }

      const userStats = data.result[0];
      const userId = userStats.userId;

      const [flightsResponse, gradeResponse] = await Promise.all([
        fetch(
          `https://api.infiniteflight.com/public/v2/users/${userId}/flights?page=1`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_INFINITE_FLIGHT_API_KEY}`,
            },
          },
        ),
        fetch(`https://api.infiniteflight.com/public/v2/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_INFINITE_FLIGHT_API_KEY}`,
          },
        }),
      ]);

      const [flightsData, gradeData] = await Promise.all([
        flightsResponse.json(),
        gradeResponse.json(),
      ]);

      const recentFlights = flightsData.result?.data || [];
      const routeMap = new Map();

      recentFlights.forEach((flight) => {
        if (flight.originAirport && flight.destinationAirport) {
          const route = `${flight.originAirport}-${flight.destinationAirport}`;
          routeMap.set(route, (routeMap.get(route) || 0) + 1);
        }
      });

      const dayTime = Math.floor(userStats.flightTime * (2 / 3));
      const nightTime = userStats.flightTime - dayTime;

      setStats({
        general: {
          xp: userStats.xp.toLocaleString(),
          grade: userStats.grade,
          atcRank: userStats.atcRank || "N/A",
          violations: userStats.violations,
        },
        flight: {
          total: userStats.onlineFlights.toString(),
          hours: Math.floor(userStats.flightTime / 60),
          minutes: userStats.flightTime % 60,
          landings: userStats.landingCount.toString(),
          dayTime: Math.floor(dayTime / 60),
          nightTime: Math.floor(nightTime / 60),
          violationsByLevel: userStats.violationCountByLevel,
        },
        routes: Array.from(routeMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([route, count]) => {
            const [from, to] = route.split("-");
            return { from, to, count: count.toString() };
          }),
        roles: userStats.roles,
        virtual_org: userStats.virtualOrganization || "None",
        lastFlight: recentFlights[0] || null,
      });

      setLastUpdate(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError("Failed to fetch flight stats");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !stats) {
    return (
      <main className="terminal-main">
        <div className="loading-overlay">
          <RefreshCw className="spin" />
          <span>Loading Stats</span>
        </div>
      </main>
    );
  }

  return (
    <main className="terminal-main">
      <div className="terminal-frame">
        <div className="terminal-header">
          <Circle size={8} className="status-dot" />
          <span className="status-text">DAN7SH STATUS: ACTIVE</span>
          <div className="header-actions">
            <button
              onClick={fetchStats}
              className="terminal-btn"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => setShowInfo(true)}
              className="terminal-btn primary"
            >
              <Info size={16} />
            </button>
          </div>
        </div>

        <div className="terminal-scroll">
          <div className="terminal-grid">
            <section className="terminal-section">
              <div className="planes-section-header">
                <Award size={16} className="section-icon gold" />
                <h2>PROFILE</h2>
              </div>
              <div className="data-grid">
                <div className="data-box">
                  <Shield size={16} className="orange" />
                  <span className="box-label">Grade</span>
                  <span className="box-value">{stats.general.grade}</span>
                </div>
                <div className="data-box">
                  <BarChart3 size={16} className="blue" />
                  <span className="box-label">Experience</span>
                  <span className="box-value">{stats.general.xp}</span>
                </div>
                <div className="data-box">
                  <Navigation2 size={16} className="cyan" />
                  <span className="box-label">ATC Rank</span>
                  <span className="box-value">{stats.general.atcRank}</span>
                </div>
              </div>
            </section>

            <section className="terminal-section">
              <div className="planes-section-header">
                <Plane size={16} className="section-icon blue" />
                <h2>FLIGHT DATA</h2>
              </div>
              <div className="data-grid larger">
                <div className="data-box">
                  <Clock size={16} />
                  <span className="box-label">Total Hours</span>
                  <span className="box-value">{`${stats.flight.hours}h ${stats.flight.minutes}m`}</span>
                </div>
                <div className="data-box">
                  <Plane size={16} />
                  <span className="box-label">Total Flights</span>
                  <span className="box-value">{stats.flight.total}</span>
                </div>
                <div className="data-box">
                  <Compass size={16} />
                  <span className="box-label">Landings</span>
                  <span className="box-value">{stats.flight.landings}</span>
                </div>
                <div className="data-box">
                  <Shield size={16} />
                  <span className="box-label">Violations</span>
                  <span className="box-value">{stats.general.violations}</span>
                </div>
              </div>
            </section>

            <section className="terminal-section">
              <div className="planes-section-header">
                <Cloud size={16} className="section-icon purple" />
                <h2>FLIGHT CONDITIONS</h2>
              </div>
              <div className="data-grid dual">
                <div className="data-box">
                  <Palmtree size={16} className="orange" />
                  <span className="box-label">Day Flight Time</span>
                  <span className="box-value">{`${stats.flight.dayTime}h`}</span>
                </div>
                <div className="data-box">
                  <Moon size={16} className="blue" />
                  <span className="box-label">Night Flight Time</span>
                  <span className="box-value">{`${stats.flight.nightTime}h`}</span>
                </div>
              </div>
            </section>

            {stats.routes?.length > 0 && (
              <section className="terminal-section">
                <div className="planes-section-header">
                  <Navigation2 size={16} className="section-icon cyan" />
                  <h2>FREQUENT ROUTES</h2>
                </div>
                <div className="list-data">
                  {stats.routes.map((route, index) => (
                    <div key={index} className="list-item">
                      <div className="list-item-main">
                        <Compass size={14} className="icon-offset" />
                        <span>
                          {route.from} → {route.to}
                        </span>
                      </div>
                      <span className="list-item-value">
                        {route.count} flights
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {stats.lastFlight && (
              <section className="terminal-section">
                <div className="planes-section-header">
                  <Clock size={16} className="section-icon gold" />
                  <h2>LAST FLIGHT</h2>
                </div>
                <div className="data-box">
                  <div className="list-item-main">
                    <span>
                      {stats.lastFlight.originAirport} →{" "}
                      {stats.lastFlight.destinationAirport}
                    </span>
                  </div>
                  <span className="box-label">
                    Callsign: {stats.lastFlight.callsign}
                  </span>
                </div>
              </section>
            )}
          </div>
        </div>

        {showInfo && (
          <div className="info-overlay" onClick={() => setShowInfo(false)}>
            <div className="info-box" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowInfo(false)}>
                <X size={16} />
              </button>
              <h3>INFINITE FLIGHT LIVE DATA</h3>
              <div className="info-grid">
                <div className="info-stat info-row-1">
                  <span className="stat-label">Last Update: </span>
                  <span className="stat-value">{lastUpdate}</span>
                </div>
                <div className="info-stat info-row-2">
                  <span className="stat-label">L1 Violations: </span>
                  <span className="stat-value">
                    {stats.flight.violationsByLevel.level1}
                  </span>
                </div>
                <div className="info-stat info-row-2">
                  <span className="stat-label">L2 Violations: </span>
                  <span className="stat-value">
                    {stats.flight.violationsByLevel.level2}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ButtonsContainer />
    </main>
  );
}

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "../styles/analytics.css";
import "../styles/sidebar.css";

function Analytics() {

  const [sessions, setSessions] =
    useState([]);

  // ================= FETCH USER SESSIONS =================

  useEffect(() => {

    fetchSessions();

  }, []);

  const fetchSessions = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {

        alert(
          "Please Login First"
        );

        return;

      }

      const response =
        await API.get(

          "/study/get",

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      setSessions(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= TOTAL FOCUS =================

  const totalFocusMinutes =
    sessions.reduce(
      (sum, item) =>
        sum +
        Number(
          item.focusDuration || 0
        ),
      0
    );

  const totalHours =
    (
      totalFocusMinutes / 60
    ).toFixed(1);

  // ================= TOTAL SESSIONS =================

  const completedSessions =
    sessions.length;

  // ================= SUBJECT COUNTS =================

  const subjectData = {};

  sessions.forEach((item) => {

    const subject =
      item.subject || "Unknown";

    const focus =
      Number(
        item.focusDuration || 0
      );

    if (!subjectData[subject]) {

      subjectData[subject] = 0;

    }

    subjectData[subject] += focus;

  });

  // ================= PIE DATA =================

  const pieData =
    Object.keys(subjectData).map(
      (subject) => ({
        name: subject,
        value:
          subjectData[subject],
      })
    );

  // ================= TOP SUBJECT =================

  let topSubject = "No Data";

  if (pieData.length > 0) {

    topSubject =
      pieData.reduce(
        (max, item) =>
          item.value > max.value
            ? item
            : max
      ).name;

  }

  // ================= BAR DATA =================

  const barData =
    sessions.map((item) => ({
      topic:
        item.topic || "Unknown",

      focus:
        Number(
          item.focusDuration || 0
        ),
    }));

  // ================= FOCUS SCORE =================

  const focusScore =
    completedSessions === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            totalFocusMinutes /
              completedSessions
          )
        );

  // ================= COLORS =================

  const COLORS = [

    "#3b82f6",

    "#60a5fa",

    "#2563eb",

    "#93c5fd",

    "#1d4ed8",

  ];

  return (

    <div className="dashboard-layout">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h1 className="logo">
          StudyOS
        </h1>

        <nav className="sidebar-menu">

          <Link to="/">
            Dashboard
          </Link>

          <Link to="/history">
            History
          </Link>

          <Link to="/timer">
            Focus Timer
          </Link>

          <Link to="/notes">
            Notes
          </Link>

          <Link to="/translator">
            Translator
          </Link>

          <Link
            to="/analytics"
            className="active-link"
          >
            Analytics
          </Link>

          <Link to="/music">
            Focus Music
          </Link>

          <Link to="/settings">
            Settings
          </Link>

        </nav>

      </div>

      {/* MAIN */}

      <div className="analytics-page">

        <h1 className="analytics-title">
          Study Analytics
        </h1>

        {/* TOP CARDS */}

        <div className="analytics-grid">

          {/* TOTAL HOURS */}

          <div className="analytics-card">

            <h2>
              Total Study Hours
            </h2>

            <h3>
              {totalHours} hrs
            </h3>

          </div>

          {/* FOCUS SCORE */}

          <div className="analytics-card">

            <h2>
              Focus Score
            </h2>

            <h3>
              {focusScore}%
            </h3>

          </div>

          {/* COMPLETED */}

          <div className="analytics-card">

            <h2>
              Completed Sessions
            </h2>

            <h3>
              {completedSessions}
            </h3>

          </div>

          {/* TOP SUBJECT */}

          <div className="analytics-card">

            <h2>
              Top Subject
            </h2>

            <h3>
              {topSubject}
            </h3>

          </div>

        </div>

        {/* CHARTS */}

        <div className="charts-container">

          {/* BAR CHART */}

          <div className="chart-card">

            <h2>
              Focus Time By Topic
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={barData}
              >

                <XAxis
                  dataKey="topic"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="focus"
                  fill="#3b82f6"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div className="chart-card">

            <h2>
              Subject Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {
                    pieData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                              COLORS.length
                            ]
                          }
                        />

                      )
                    )
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Analytics;
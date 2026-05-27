import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import "../styles/history.css";
import "../styles/sidebar.css";

function History() {

  const [sessions, setSessions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // ================= FETCH SESSIONS =================

  const fetchSessions = async () => {

    try {

      const response =
        await API.get("/study/get");

      console.log(response.data);

      setSessions(response.data);

    } catch (error) {

      console.log(
        "Fetch Error:",
        error
      );

    }

  };

  // ================= USE EFFECT =================

  useEffect(() => {

    fetchSessions();

  }, []);

  // ================= DELETE =================

  const deleteSession =
    async (id) => {

      try {

        await API.delete(
          `/study/delete/${id}`
        );

        fetchSessions();

      } catch (error) {

        console.log(error);

      }

    };

  // ================= SEARCH FILTER =================

  const filteredSessions =
    sessions.filter((item) => {

      return (

        item.subject
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.topic
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );

    });

  // ================= TOTAL FOCUS =================

  const totalFocus =
    filteredSessions.reduce(
      (acc, item) =>
        acc + Number(item.focusDuration),
      0
    );

  return (

    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}

      <div className="sidebar">

        <h1 className="logo">
          StudyOS
        </h1>

        <nav className="sidebar-menu">

          <Link to="/">
            Dashboard
          </Link>

          <Link
            to="/history"
            className="active-link"
          >
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

          <Link to="/analytics">
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

      {/* ================= MAIN ================= */}

      <div className="history-page">

        <h1 className="history-title">
          Session History
        </h1>

        {/* ================= TOP CARDS ================= */}

        <div className="history-top">

          <div className="history-card-top">

            <h3>
              Total Sessions
            </h3>

            <h1>
              {filteredSessions.length}
            </h1>

          </div>

          <div className="history-card-top">

            <h3>
              Total Focus Time
            </h3>

            <h1>
              {totalFocus} min
            </h1>

          </div>

        </div>

        {/* ================= SEARCH ================= */}

        <input
          type="text"
          placeholder="Search Subject or Topic..."
          className="history-search"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* ================= TABLE ================= */}

        <div className="history-table">

          <table>

            <thead>

              <tr>

                <th>Subject</th>

                <th>Topic</th>

                <th>Focus</th>

                <th>Break</th>

                <th>Sessions</th>

                <th>Date</th>

                <th>Time</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredSessions.length > 0
                ? (

                  filteredSessions.map(
                    (session) => (

                      <tr key={session._id}>

                        <td>
                          {session.subject}
                        </td>

                        <td>
                          {session.topic}
                        </td>

                        <td>
                          {
                            session.focusDuration
                          } min
                        </td>

                        <td>
                          {
                            session.breakDuration
                          } min
                        </td>

                        <td>
                          {
                            session.totalSessions
                          }
                        </td>

                        {/* DATE */}

                        <td>

                          {
                            new Date(
                              session.createdAt
                            ).toLocaleDateString(
                              "en-GB"
                            )
                          }

                        </td>

                        {/* TIME */}

                        <td>

                          {
                            new Date(
                              session.createdAt
                            ).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              }
                            )
                          }

                        </td>

                        {/* DELETE */}

                        <td>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteSession(
                                session._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      style={{
                        textAlign:
                          "center",

                        padding:
                          "30px",
                      }}
                    >

                      No Session Found

                    </td>

                  </tr>

                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default History;
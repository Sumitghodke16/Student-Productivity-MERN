import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import API from "../services/api";

function SessionHistory() {

  // ================= STATES =================

  const [sessions, setSessions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // ================= FETCH SESSIONS =================

  const fetchSessions =
    async () => {

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

        setSessions(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchSessions();

  }, []);

  // ================= DELETE SESSION =================

  const handleDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(

          `/study/delete/${id}`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

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

  const totalFocusMinutes =
    filteredSessions.reduce(

      (acc, item) =>

        acc +
        Number(
          item.focusDuration || 0
        ),

      0

    );

  return (

    <Layout>

      <div
        style={{
          maxWidth: "1500px",

          margin: "0 auto",

          width: "100%",
        }}
      >

        {/* ================= TITLE ================= */}

        <h1
          style={{
            fontSize:
              "clamp(55px,6vw,90px)",

            fontWeight: "800",

            marginBottom: "30px",

            lineHeight: "1.1",
          }}
        >
          Session History
        </h1>

        {/* ================= TOP CARDS ================= */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",

            gap: "24px",

            marginBottom: "30px",
          }}
        >

          {/* TOTAL SESSIONS */}

          <div style={topCardStyle}>

            <h3 style={topCardTitle}>
              Total Sessions
            </h3>

            <h1 style={topCardValue}>
              {filteredSessions.length}
            </h1>

          </div>

          {/* TOTAL FOCUS */}

          <div style={topCardStyle}>

            <h3 style={topCardTitle}>
              Total Focus Time
            </h3>

            <h1 style={topCardValue}>
              {totalFocusMinutes} min
            </h1>

          </div>

        </div>

        {/* ================= SEARCH ================= */}

        <input
          type="text"
          placeholder="Search Subject or Topic..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={searchStyle}
        />

        {/* ================= TABLE ================= */}

        <div
          style={{
            marginTop: "30px",

            overflowX: "auto",

            borderRadius: "22px",

            border:
              "1px solid rgba(255,255,255,0.05)",
          }}
        >

          <table style={tableStyle}>

            <thead>

              <tr
                style={{
                  background: "#1e293b",
                }}
              >

                <th style={thStyle}>
                  Subject
                </th>

                <th style={thStyle}>
                  Topic
                </th>

                <th style={thStyle}>
                  Focus
                </th>

                <th style={thStyle}>
                  Break
                </th>

                <th style={thStyle}>
                  Sessions
                </th>

                <th style={thStyle}>
                  Date
                </th>

                <th style={thStyle}>
                  Time
                </th>

                <th style={thStyle}>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSessions.length >
              0 ? (

                filteredSessions.map(
                  (item) => (

                    <tr
                      key={item._id}
                      style={{
                        borderBottom:
                          "1px solid rgba(255,255,255,0.05)",
                      }}
                    >

                      <td style={tdStyle}>
                        {item.subject}
                      </td>

                      <td style={tdStyle}>
                        {item.topic}
                      </td>

                      <td style={tdStyle}>
                        {
                          item.focusDuration
                        }{" "}
                        min
                      </td>

                      <td style={tdStyle}>
                        {
                          item.breakDuration
                        }{" "}
                        min
                      </td>

                      <td style={tdStyle}>
                        {
                          item.totalSessions
                        }
                      </td>

                      <td style={tdStyle}>
                        {item.date}
                      </td>

                      <td style={tdStyle}>
                        {item.startTime}
                      </td>

                      <td style={tdStyle}>

                        <button
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                          style={
                            deleteButton
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
                      padding:
                        "40px",

                      textAlign:
                        "center",

                      color:
                        "#94a3b8",

                      fontSize:
                        "20px",
                    }}
                  >
                    No Session Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );

}

// ================= STYLES =================

const topCardStyle = {

  background:
    "rgba(15,23,42,0.95)",

  borderRadius: "24px",

  padding: "28px",

};

const topCardTitle = {

  color: "#94a3af",

  fontSize: "20px",

  marginBottom: "16px",

};

const topCardValue = {

  fontSize: "72px",

  fontWeight: "800",

};

const searchStyle = {

  width: "100%",

  maxWidth: "450px",

  padding: "16px",

  borderRadius: "14px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  background: "#1e293b",

  color: "white",

  fontSize: "16px",

  outline: "none",

};

const tableStyle = {

  width: "100%",

  borderCollapse: "collapse",

  background:
    "rgba(15,23,42,0.96)",

};

const thStyle = {

  padding: "20px",

  textAlign: "left",

  color: "white",

  fontSize: "16px",

};

const tdStyle = {

  padding: "20px",

  color: "#e2e8f0",

  fontSize: "15px",

};

const deleteButton = {

  border: "none",

  padding: "12px 18px",

  borderRadius: "12px",

  background:
    "linear-gradient(90deg,#dc2626,#ef4444)",

  color: "white",

  fontWeight: "700",

  cursor: "pointer",

};

export default SessionHistory;
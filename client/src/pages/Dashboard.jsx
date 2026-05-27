import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import API from "../services/api";

function Dashboard() {

  // ================= STATES =================

  const [subject, setSubject] =
    useState("");

  const [topic, setTopic] =
    useState("");

  const [
    focusDuration,
    setFocusDuration,
  ] = useState("");

  const [
    breakDuration,
    setBreakDuration,
  ] = useState("");

  const [
    totalSessions,
    setTotalSessions,
  ] = useState("");

  const [sessions, setSessions] =
    useState([]);

  // ================= FETCH SESSIONS =================

  const fetchSessions =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

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

        console.log(
          "Fetch Error:",
          error
        );

      }

    };

  useEffect(() => {

    fetchSessions();

  }, []);

  // ================= ADD SESSION =================

  const handleAddSession =
    async (e) => {

      e.preventDefault();

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

        // ================= DATE & TIME =================

        const now =
          new Date();

        const formattedDate =
          now.toLocaleDateString(
            "en-GB"
          );

        const formattedTime =
          now.toLocaleTimeString(
            "en-IN",
            {
              hour: "2-digit",

              minute: "2-digit",

              second: "2-digit",

              hour12: true,
            }
          );

        // ================= NEW SESSION =================

        const newSession = {

          subject,

          topic,

          focusDuration:
            Number(
              focusDuration
            ),

          breakDuration:
            Number(
              breakDuration
            ),

          totalSessions:
            Number(
              totalSessions
            ),

          date:
            formattedDate,

          time:
            formattedTime,

        };

        // ================= SAVE =================

        await API.post(
          "/study/add",
          newSession,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        // ================= REFRESH =================

        fetchSessions();

        // ================= CLEAR =================

        setSubject("");

        setTopic("");

        setFocusDuration("");

        setBreakDuration("");

        setTotalSessions("");

        alert(
          "Session Added Successfully"
        );

      } catch (error) {

        console.log(
          "Add Session Error:",
          error
        );

        alert(
          "Failed To Add Session"
        );

      }

    };

  // ================= TOTAL FOCUS =================

  const totalFocusTime =
    sessions.reduce(

      (acc, item) =>

        acc +
        Number(
          item.focusDuration || 0
        ),

      0

    );

  // ================= UNIQUE SUBJECTS =================

  const uniqueSubjects =
    [
      ...new Set(
        sessions.map(
          (item) =>
            item.subject
        )
      ),
    ];

  return (

    <Layout>

      <div
        style={{
          maxWidth: "1400px",

          margin: "0 auto",

          width: "100%",
        }}
      >

        {/* ================= TITLE ================= */}

        <h1
          style={{
            fontSize:
              "clamp(48px,6vw,92px)",

            fontWeight: "800",

            marginBottom: "28px",

            lineHeight: "1.1",
          }}
        >
          Study Dashboard
        </h1>

        {/* ================= TOP CARDS ================= */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",

            gap: "20px",

            marginBottom: "30px",
          }}
        >

          {/* TOTAL SESSIONS */}

          <div style={cardStyle}>

            <h3 style={cardTitle}>
              Total Sessions
            </h3>

            <h1 style={cardNumber}>
              {sessions.length}
            </h1>

          </div>

          {/* TOTAL FOCUS */}

          <div style={cardStyle}>

            <h3 style={cardTitle}>
              Focus Time
            </h3>

            <h1 style={cardNumber}>
              {totalFocusTime} min
            </h1>

          </div>

          {/* SUBJECTS */}

          <div style={cardStyle}>

            <h3 style={cardTitle}>
              Subjects
            </h3>

            <div
              style={{
                display: "flex",

                flexWrap: "wrap",

                gap: "10px",

                marginTop: "18px",
              }}
            >

              {
                uniqueSubjects.map(
                  (
                    item,
                    index
                  ) => (

                    <span
                      key={index}
                      style={{
                        background:
                          "#3b82f6",

                        padding:
                          "10px 18px",

                        borderRadius:
                          "999px",

                        fontWeight:
                          "600",

                        fontSize:
                          "14px",
                      }}
                    >
                      {item}
                    </span>

                  )
                )
              }

            </div>

          </div>

        </div>

        {/* ================= FORM CARD ================= */}

        <div style={formCard}>

          <h1
            style={{
              fontSize:
                "clamp(34px,5vw,58px)",

              marginBottom: "28px",

              fontWeight: "800",

              lineHeight: "1.1",
            }}
          >
            Add Study Session
          </h1>

          <form
            onSubmit={
              handleAddSession
            }
          >

            {/* ================= INPUT GRID ================= */}

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",

                gap: "16px",

                marginBottom: "22px",
              }}
            >

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) =>
                  setSubject(
                    e.target.value
                  )
                }
                style={inputStyle}
                required
              />

              <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) =>
                  setTopic(
                    e.target.value
                  )
                }
                style={inputStyle}
                required
              />

              <input
                type="number"
                placeholder="Focus Duration"
                value={
                  focusDuration
                }
                onChange={(e) =>
                  setFocusDuration(
                    e.target.value
                  )
                }
                style={inputStyle}
                required
              />

              <input
                type="number"
                placeholder="Break Duration"
                value={
                  breakDuration
                }
                onChange={(e) =>
                  setBreakDuration(
                    e.target.value
                  )
                }
                style={inputStyle}
                required
              />

              <input
                type="number"
                placeholder="Total Sessions"
                value={
                  totalSessions
                }
                onChange={(e) =>
                  setTotalSessions(
                    e.target.value
                  )
                }
                style={inputStyle}
                required
              />

            </div>

            {/* ================= BUTTON ================= */}

            <button
              type="submit"
              style={buttonStyle}
            >
              Add Session
            </button>

          </form>

        </div>

      </div>

    </Layout>

  );

}

// ================= CARD STYLE =================

const cardStyle = {

  background:
    "rgba(15,23,42,0.95)",

  borderRadius: "24px",

  padding: "30px",

  minHeight: "200px",

  display: "flex",

  flexDirection: "column",

  justifyContent: "center",

};

// ================= CARD TITLE =================

const cardTitle = {

  color: "#94a3b8",

  fontSize: "22px",

  marginBottom: "14px",

  fontWeight: "600",

};

// ================= CARD NUMBER =================

const cardNumber = {

  fontSize:
    "clamp(50px,6vw,76px)",

  fontWeight: "800",

  lineHeight: "1.1",

};

// ================= FORM CARD =================

const formCard = {

  background:
    "rgba(15,23,42,0.95)",

  borderRadius: "24px",

  padding: "30px",

};

// ================= INPUT STYLE =================

const inputStyle = {

  padding: "18px",

  borderRadius: "14px",

  border: "none",

  outline: "none",

  background: "#1e293b",

  color: "white",

  fontSize: "15px",

  width: "100%",

  boxSizing: "border-box",

};

// ================= BUTTON STYLE =================

const buttonStyle = {

  width: "100%",

  padding: "18px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(to right,#2563eb,#60a5fa)",

  color: "white",

  fontSize: "22px",

  fontWeight: "700",

  cursor: "pointer",

};

export default Dashboard;
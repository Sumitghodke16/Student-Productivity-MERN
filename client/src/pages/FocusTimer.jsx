import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/timer.css";
import "../styles/sidebar.css";

function Timer() {

  const [focusMinutes, setFocusMinutes] =
    useState(25);

  const [breakMinutes, setBreakMinutes] =
    useState(5);

  const [secondsLeft, setSecondsLeft] =
    useState(25 * 60);

  const [isRunning, setIsRunning] =
    useState(false);

  const [isBreak, setIsBreak] =
    useState(false);

  const [modeText, setModeText] =
    useState("Deep Focus Mode");

  const timerRef = useRef(null);

  // ================= ALARM SOUND =================

  const playAlarm = () => {

    const alarm = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );

    alarm.play();

  };

  // ================= TIMER LOGIC =================

  useEffect(() => {

    if (isRunning) {

      timerRef.current = setInterval(() => {

        setSecondsLeft((prev) => {

          // TIMER END

          if (prev <= 1) {

            clearInterval(timerRef.current);

            playAlarm();

            // SWITCH TO BREAK

            if (!isBreak) {

              setModeText(
                "Break Time"
              );

              setIsBreak(true);

              setSecondsLeft(
                breakMinutes * 60
              );

              setIsRunning(true);

            }

            // SWITCH TO FOCUS

            else {

              setModeText(
                "Deep Focus Mode"
              );

              setIsBreak(false);

              setSecondsLeft(
                focusMinutes * 60
              );

              setIsRunning(true);

            }

            return 0;

          }

          return prev - 1;

        });

      }, 1000);

    }

    return () =>
      clearInterval(timerRef.current);

  }, [
    isRunning,
    isBreak,
    focusMinutes,
    breakMinutes,
  ]);

  // ================= START TIMER =================

  const startTimer = () => {

    if (
      focusMinutes <= 0 ||
      breakMinutes <= 0
    ) {
      alert(
        "Please enter valid time"
      );
      return;
    }

    setSecondsLeft(
      isBreak
        ? breakMinutes * 60
        : focusMinutes * 60
    );

    setIsRunning(true);

  };

  // ================= PAUSE TIMER =================

  const pauseTimer = () => {

    clearInterval(timerRef.current);

    setIsRunning(false);

  };

  // ================= RESET TIMER =================

  const resetTimer = () => {

    clearInterval(timerRef.current);

    setIsRunning(false);

    setIsBreak(false);

    setModeText(
      "Deep Focus Mode"
    );

    setSecondsLeft(
      focusMinutes * 60
    );

  };

  // ================= FORMAT TIME =================

  const minutes =
    Math.floor(secondsLeft / 60);

  const seconds =
    secondsLeft % 60;

  const formattedTime =
    `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(
      2,
      "0"
    )}`;

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

          <Link
            to="/timer"
            className="active-link"
          >
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

      {/* MAIN */}

      <div className="timer-page">

        <div className="timer-card">

          <h1 className="timer-title">
            Focus Timer
          </h1>

          {/* INPUTS */}

          <div className="timer-inputs">

            <input
              type="number"
              placeholder="Focus Minutes"
              value={focusMinutes}
              onChange={(e) =>
                setFocusMinutes(
                  Number(e.target.value)
                )
              }
            />

            <input
              type="number"
              placeholder="Break Minutes"
              value={breakMinutes}
              onChange={(e) =>
                setBreakMinutes(
                  Number(e.target.value)
                )
              }
            />

          </div>

          {/* TIMER CIRCLE */}

          <div className="timer-circle">

            <h2>
              {formattedTime}
            </h2>

          </div>

          {/* MODE */}

          <h2 className="mode-text">
            {modeText}
          </h2>

          {/* BUTTONS */}

          <div className="timer-buttons">

            <button
              onClick={startTimer}
            >
              Start
            </button>

            <button
              onClick={pauseTimer}
            >
              Pause
            </button>

            <button
              onClick={resetTimer}
            >
              Reset
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Timer;
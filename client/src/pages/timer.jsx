import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "../styles/timer.css";
import "../styles/sidebar.css";

function Timer() {

  /* STATES */

  const [focusMinutes, setFocusMinutes] =
    useState(45);

  const [breakMinutes, setBreakMinutes] =
    useState(5);

  const [timeLeft, setTimeLeft] =
    useState(45 * 60);

  const [isRunning, setIsRunning] =
    useState(false);

  const [mode, setMode] =
    useState("focus");

  /* LOAD SAVED TIMER */

  useEffect(() => {

    const savedEndTime =
      localStorage.getItem("timerEnd");

    const savedRunning =
      localStorage.getItem("timerRunning");

    const savedMode =
      localStorage.getItem("timerMode");

    if (
      savedEndTime &&
      savedRunning === "true"
    ) {

      const remaining =
        Math.floor(
          (
            Number(savedEndTime) -
            Date.now()
          ) / 1000
        );

      if (remaining > 0) {

        setTimeLeft(remaining);

        setIsRunning(true);

        setMode(savedMode || "focus");

      }

    }

  }, []);

  /* TIMER */

  useEffect(() => {

    let interval;

    if (isRunning) {

      interval = setInterval(() => {

        const savedEndTime =
          localStorage.getItem("timerEnd");

        const remaining =
          Math.floor(
            (
              Number(savedEndTime) -
              Date.now()
            ) / 1000
          );

        if (remaining <= 0) {

          clearInterval(interval);

          playAlarm();

          showNotification();

          /* SWITCH TO BREAK */

          if (mode === "focus") {

            setMode("break");

            const breakSeconds =
              breakMinutes * 60;

            setTimeLeft(breakSeconds);

            const newEnd =
              Date.now() +
              breakSeconds * 1000;

            localStorage.setItem(
              "timerEnd",
              newEnd
            );

            localStorage.setItem(
              "timerMode",
              "break"
            );

          }

          /* BREAK FINISHED */

          else {

            setMode("focus");

            setIsRunning(false);

            setTimeLeft(
              focusMinutes * 60
            );

            localStorage.removeItem(
              "timerEnd"
            );

            localStorage.removeItem(
              "timerRunning"
            );

            localStorage.removeItem(
              "timerMode"
            );

          }

        }

        else {

          setTimeLeft(remaining);

        }

      }, 1000);

    }

    return () =>
      clearInterval(interval);

  }, [
    isRunning,
    mode,
    breakMinutes,
    focusMinutes
  ]);

  /* START */

  const startTimer = () => {

    if (
      focusMinutes <= 0 ||
      breakMinutes < 0
    ) {

      alert(
        "Please enter valid time."
      );

      return;

    }

    const endTime =
      Date.now() +
      timeLeft * 1000;

    localStorage.setItem(
      "timerEnd",
      endTime
    );

    localStorage.setItem(
      "timerRunning",
      "true"
    );

    localStorage.setItem(
      "timerMode",
      mode
    );

    setIsRunning(true);

  };

  /* PAUSE */

  const pauseTimer = () => {

    setIsRunning(false);

    localStorage.setItem(
      "timerRunning",
      "false"
    );

  };

  /* RESET */

  const resetTimer = () => {

    setIsRunning(false);

    setMode("focus");

    setTimeLeft(
      focusMinutes * 60
    );

    localStorage.removeItem(
      "timerEnd"
    );

    localStorage.removeItem(
      "timerRunning"
    );

    localStorage.removeItem(
      "timerMode"
    );

  };

  /* ALARM */

  const playAlarm = () => {

    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );

    audio.volume = 1;

    audio.play();

  };

  /* NOTIFICATION */

  const showNotification = () => {

    if (
      Notification.permission ===
      "granted"
    ) {

      new Notification(
        "StudyOS Timer",
        {
          body:
            mode === "focus"
              ? "Great Work! Time for a short break."
              : "Break Finished! Back to deep focus.",
        }
      );

    }

  };

  /* ASK NOTIFICATION PERMISSION */

  useEffect(() => {

    if (
      Notification.permission !==
      "granted"
    ) {

      Notification.requestPermission();

    }

  }, []);

  /* FORMAT TIME */

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

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

      <div className="dashboard-main">

        <div className="timer-card">

          <h1 className="timer-title">
            Focus Timer
          </h1>

          {/* INPUTS */}

          <div className="timer-inputs">

            <input
              type="number"

              value={
                focusMinutes || ""
              }

              onChange={(e) => {

                setFocusMinutes(
                  Number(
                    e.target.value
                  )
                );

                if (!isRunning) {

                  setTimeLeft(
                    Number(
                      e.target.value
                    ) * 60
                  );

                }

              }}

              placeholder="Focus Minutes"

              className="timer-input"
            />

            <input
              type="number"

              value={
                breakMinutes || ""
              }

              onChange={(e) =>
                setBreakMinutes(
                  Number(
                    e.target.value
                  )
                )
              }

              placeholder="Break Minutes"

              className="timer-input"
            />

          </div>

          {/* TIMER */}

          <div className="timer-circle">

            <h2>

              {String(minutes).padStart(
                2,
                "0"
              )}

              :

              {String(seconds).padStart(
                2,
                "0"
              )}

            </h2>

          </div>

          {/* MODE */}

          <p className="mode-text">

            {mode === "focus"
              ? "Deep Focus Mode"
              : "Break Time"}

          </p>

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
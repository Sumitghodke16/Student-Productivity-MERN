import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import API from "../services/api";

import "../styles/translator.css";
import "../styles/sidebar.css";

function Translator() {

  // ================= STATES =================

  const [text, setText] =
    useState("");

  const [translated, setTranslated] =
    useState("");

  const [savedWords, setSavedWords] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [direction, setDirection] =
    useState("en-mr");

  // ================= LOAD SAVED WORDS =================

  useEffect(() => {

    fetchWords();

  }, []);

  const fetchWords = async () => {

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

          "/dictionary/get",

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      setSavedWords(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  // ================= TRANSLATE =================

  const handleTranslate =
    async () => {

      if (!text) return;

      setLoading(true);

      try {

        let fromLang = "en";

        let toLang = "mr";

        if (
          direction === "mr-en"
        ) {

          fromLang = "mr";

          toLang = "en";

        }

        const response =
          await axios.post(

            "http://localhost:5000/translate",

            {

              text,

              from: fromLang,

              to: toLang,

            }

          );

        setTranslated(
          response.data.translated
        );

      } catch (error) {

        console.log(error);

        setTranslated(
          "Translation Failed"
        );

      }

      setLoading(false);

    };

  // ================= PRONUNCIATION =================

  const handlePronounce =
    () => {

      const speech =
        new SpeechSynthesisUtterance(
          text
        );

      speech.lang = "en-US";

      speech.rate = 0.9;

      window.speechSynthesis.speak(
        speech
      );

    };

  // ================= SAVE WORD =================

  const handleSave =
    async () => {

      if (
        !text ||
        !translated
      ) {

        return;

      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(

          "/dictionary/save",

          {

            word: text,

            meaning: translated,

          },

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

        fetchWords();

        alert(
          "Word Saved Successfully!"
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ================= DELETE WORD =================

  const handleDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(

          `/dictionary/delete/${id}`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

        fetchWords();

      } catch (error) {

        console.log(error);

      }

    };

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

          <Link
            to="/translator"
            className="active-link"
          >
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

        <div className="translator-container">

          <h1 className="translator-title">
            Smart Translator
          </h1>

          {/* LANGUAGE SWITCH */}

          <div className="language-switch">

            <button
              className={
                direction === "en-mr"
                  ? "active-switch"
                  : ""
              }
              onClick={() =>
                setDirection(
                  "en-mr"
                )
              }
            >
              English → Marathi
            </button>

            <button
              className={
                direction === "mr-en"
                  ? "active-switch"
                  : ""
              }
              onClick={() =>
                setDirection(
                  "mr-en"
                )
              }
            >
              Marathi → English
            </button>

          </div>

          {/* TRANSLATOR CARD */}

          <div className="translator-card">

            <textarea
              placeholder="Enter text..."
              value={text}
              onChange={(e) =>
                setText(
                  e.target.value
                )
              }
            />

            <button
              className="translate-btn"
              onClick={
                handleTranslate
              }
            >

              {
                loading
                  ? "Translating..."
                  : "Translate"
              }

            </button>

            {/* RESULT */}

            <div className="result-box">

              <h2>
                Translation Result
              </h2>

              <div className="translation-output">

                {
                  translated
                    ? translated
                    : "Your translation will appear here..."
                }

              </div>

              {/* ACTIONS */}

              <div className="action-buttons">

                <button
                  onClick={
                    handlePronounce
                  }
                >
                  🔊 Pronunciation
                </button>

                <button
                  onClick={
                    handleSave
                  }
                >
                  ⭐ Save
                </button>

              </div>

            </div>

          </div>

          {/* SAVED WORDS */}

          <div className="saved-words-section">

            <h2>
              Saved Words
            </h2>

            {
              savedWords.length === 0 ? (

                <p className="empty-text">
                  No saved translations yet.
                </p>

              ) : (

                savedWords.map(
                  (item) => (

                    <div
                      key={item._id}
                      className="saved-word-card"
                    >

                      <div>

                        <strong>
                          {item.word}
                        </strong>

                        {" → "}

                        {
                          item.meaning
                        }

                      </div>

                      <button
                        onClick={() =>
                          handleDelete(
                            item._id
                          )
                        }
                        style={{
                          marginTop:
                            "12px",

                          padding:
                            "10px 16px",

                          border:
                            "none",

                          borderRadius:
                            "10px",

                          background:
                            "#ef4444",

                          color:
                            "white",

                          cursor:
                            "pointer",

                          fontWeight:
                            "600",
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  )
                )

              )
            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default Translator;
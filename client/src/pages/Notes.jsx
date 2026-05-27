import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import "../styles/notes.css";
import "../styles/sidebar.css";

function Notes() {

  // ================= STATES =================

  const [noteInput, setNoteInput] =
    useState("");

  const [notes, setNotes] =
    useState([]);

  // ================= FETCH NOTES =================

  useEffect(() => {

    fetchNotes();

  }, []);

  const fetchNotes = async () => {

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

          "/notes/get",

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      setNotes(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= ADD NOTE =================

  const addNote = async () => {

    if (
      noteInput.trim() === ""
    ) {

      return;

    }

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.post(

        "/notes/add",

        {

          content: noteInput,

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      fetchNotes();

      setNoteInput("");

      alert(
        "Note Saved Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Save Note"
      );

    }

  };

  // ================= DELETE NOTE =================

  const deleteNote =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(

          `/notes/delete/${id}`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

        fetchNotes();

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

          <Link
            to="/notes"
            className="active-link"
          >
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

      <div className="notes-page">

        <h1 className="notes-title">
          Study Notes
        </h1>

        {/* ADD NOTE */}

        <div className="notes-card">

          <textarea
            placeholder="Write your study notes here..."
            value={noteInput}
            onChange={(e) =>
              setNoteInput(
                e.target.value
              )
            }
          />

          <button
            onClick={addNote}
          >
            Save Note
          </button>

        </div>

        {/* NOTES GRID */}

        <div className="notes-grid">

          {
            notes.length > 0 ? (

              notes.map((note) => (

                <div
                  className="note-box"
                  key={note._id}
                >

                  <p>
                    {note.content}
                  </p>

                  <button
                    onClick={() =>
                      deleteNote(
                        note._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              ))

            ) : (

              <div className="empty-note">

                <h2>
                  No Notes Added
                </h2>

              </div>

            )
          }

        </div>

      </div>

    </div>

  );

}

export default Notes;
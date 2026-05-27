import { Link } from "react-router-dom";

import "../styles/music.css";
import "../styles/sidebar.css";

function Music() {

  // ================= MUSIC DATA =================

  const musicList = [

    {
      title: "Lofi Study Beats",

      description:
        "Relaxing beats for deep focus and coding sessions.",

      audio:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },

    {
      title: "Rain Sounds",

      description:
        "Peaceful rain ambience for calm studying.",

      audio:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },

    {
      title: "Nature Sounds",

      description:
        "Forest ambience for concentration and mindfulness.",

      audio:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },

    {
      title: "White Noise",

      description:
        "Block distractions and improve productivity.",

      audio:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },

  ];

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

          <Link to="/analytics">
            Analytics
          </Link>

          <Link
            to="/music"
            className="active-link"
          >
            Focus Music
          </Link>

          <Link to="/settings">
            Settings
          </Link>

        </nav>

      </div>

      {/* ================= MAIN ================= */}

      <div className="music-page">

        {/* TITLE */}

        <h1 className="music-title">
          Focus Music & Sounds
        </h1>

        <p className="music-subtitle">
          Improve concentration with calming music,
          ambient sounds, and deep focus audio.
        </p>

        {/* MUSIC GRID */}

        <div className="music-grid">

          {
            musicList.map(
              (
                music,
                index
              ) => (

                <div
                  key={index}
                  className="music-card"
                >

                  {/* CARD HEADER */}

                  <div className="music-card-top">

                    <div className="music-icon">
                      🎧
                    </div>

                    <div>

                      <h2>
                        {music.title}
                      </h2>

                      <p>
                        {
                          music.description
                        }
                      </p>

                    </div>

                  </div>

                  {/* AUDIO */}

                  <audio
                    controls
                    className="music-player"
                  >

                    <source
                      src={music.audio}
                      type="audio/mpeg"
                    />

                    Your browser does not support audio.

                  </audio>

                </div>

              )
            )
          }

        </div>

        {/* EXTRA SECTION */}

        <div className="music-bottom-card">

          <h3>
            Why Focus Music?
          </h3>

          <p>

            Listening to calm instrumental music,
            rain ambience, nature sounds, and white noise
            can help improve concentration, reduce stress,
            and create a productive study environment.

          </p>

        </div>

      </div>

    </div>

  );

}

export default Music;
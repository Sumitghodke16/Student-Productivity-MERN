import { Link, useLocation } from "react-router-dom";

import "../styles/sidebar.css";

function Sidebar() {

  const location = useLocation();

  return (

    <div className="sidebar">

      <h1 className="logo">
        StudyOS
      </h1>

      <nav className="sidebar-menu">

        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "active-link"
              : ""
          }
        >
          Dashboard
        </Link>

        <Link
          to="/history"
          className={
            location.pathname === "/history"
              ? "active-link"
              : ""
          }
        >
          History
        </Link>

        <Link
          to="/timer"
          className={
            location.pathname === "/timer"
              ? "active-link"
              : ""
          }
        >
          Focus Timer
        </Link>

        <Link
          to="/notes"
          className={
            location.pathname === "/notes"
              ? "active-link"
              : ""
          }
        >
          Notes
        </Link>

        <Link
          to="/translator"
          className={
            location.pathname === "/translator"
              ? "active-link"
              : ""
          }
        >
          Translator
        </Link>

        <Link
          to="/analytics"
          className={
            location.pathname === "/analytics"
              ? "active-link"
              : ""
          }
        >
          Analytics
        </Link>

        <Link
          to="/music"
          className={
            location.pathname === "/music"
              ? "active-link"
              : ""
          }
        >
          Focus Music
        </Link>

        <Link
          to="/settings"
          className={
            location.pathname === "/settings"
              ? "active-link"
              : ""
          }
        >
          Settings
        </Link>

      </nav>

    </div>

  );

}

export default Sidebar;
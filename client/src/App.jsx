import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import SessionHistory from "./pages/SessionHistory";
import Analytics from "./pages/Analytics";
import Translator from "./pages/Translator";
import Notes from "./pages/Notes";
import TimerPage from "./pages/timer";
import Settings from "./pages/Settings";
import Music from "./pages/music";

/* AUTH */
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* History */}
        <Route
          path="/history"
          element={<SessionHistory />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Translator */}
        <Route
          path="/translator"
          element={<Translator />}
        />

        {/* Notes */}
        <Route
          path="/notes"
          element={<Notes />}
        />

        {/* Focus Timer */}
        <Route
          path="/timer"
          element={<TimerPage />}
        />

        {/* Focus Music */}
        <Route
          path="/music"
          element={<Music />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
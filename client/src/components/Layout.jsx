import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #020617, #07152d, #020617)",
        color: "white",
      }}
    >
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
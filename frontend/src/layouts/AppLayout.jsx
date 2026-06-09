import Sidebar from "../components/Sidebar";

function AppLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
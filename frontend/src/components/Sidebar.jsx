import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2>OpsFlow</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "20px 0" }}>
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>
          </li>

          <li style={{ margin: "20px 0" }}>
            <Link to="/tickets" style={linkStyle}>
              Tickets
            </Link>
          </li>

          <li style={{ margin: "20px 0" }}>
            <Link to="/employees" style={linkStyle}>
              Employees
            </Link>
          </li>

          <li style={{ margin: "20px 0" }}>
            <Link to="/settings" style={linkStyle}>
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: "12px",
          width: "100%",
          background: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
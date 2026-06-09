import AppLayout from "../layouts/AppLayout";

function Dashboard() {
  const cardStyle = {
    background: "#1f2937",
    padding: "20px",
    borderRadius: "10px",
    width: "220px",
    color: "white",
  };

  return (
    <AppLayout>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h2>24</h2>
          <p>Open Tickets</p>
        </div>

        <div style={cardStyle}>
          <h2>12</h2>
          <p>Employees Active</p>
        </div>

        <div style={cardStyle}>
          <h2>8</h2>
          <p>Pending Tasks</p>
        </div>

        <div style={cardStyle}>
          <h2>99.9%</h2>
          <p>System Uptime</p>
        </div>
      </div>
    </AppLayout>
  );
}

export default Dashboard;
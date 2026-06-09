import { useEffect, useState } from "react";
import api from "../services/api";
import AppLayout from "../layouts/AppLayout";

function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    totalEmployees: 0,
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await api.get("/dashboard");
      setMetrics(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

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
          <h2>{metrics.totalTickets}</h2>
          <p>Total Tickets</p>
        </div>

        <div style={cardStyle}>
          <h2>{metrics.openTickets}</h2>
          <p>Open Tickets</p>
        </div>

        <div style={cardStyle}>
          <h2>{metrics.resolvedTickets}</h2>
          <p>Resolved Tickets</p>
        </div>

        <div style={cardStyle}>
          <h2>{metrics.totalEmployees}</h2>
          <p>Total Employees</p>
        </div>
      </div>
    </AppLayout>
  );
}

export default Dashboard;
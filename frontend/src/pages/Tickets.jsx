import { useEffect, useState } from "react";
import api from "../services/api";
import AppLayout from "../layouts/AppLayout";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  const [formData, setFormData] = useState({
    issue: "",
    priority: "Medium",
    status: "Open",
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.get("/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tickets", formData);
      fetchTickets();

      setFormData({
        issue: "",
        priority: "Medium",
        status: "Open",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await api.delete(`/tickets/${id}`);
      fetchTickets();
    } catch (error) {
      console.error(error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "#ff4d4f";
      case "In Progress":
        return "#faad14";
      case "Resolved":
        return "#22c55e";
      default:
        return "white";
    }
  };

  return (
    <AppLayout>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Support Tickets
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          name="issue"
          placeholder="Enter issue"
          value={formData.issue}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button type="submit" style={buttonStyle}>
          Add Ticket
        </button>
      </form>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#0f172a",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeader}>ID</th>
            <th style={tableHeader}>Issue</th>
            <th style={tableHeader}>Priority</th>
            <th style={tableHeader}>Status</th>
            <th style={tableHeader}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td style={tableCell}>{ticket.id}</td>
              <td style={tableCell}>{ticket.issue}</td>
              <td style={tableCell}>{ticket.priority}</td>
              <td
                style={{
                  ...tableCell,
                  color: getStatusColor(ticket.status),
                  fontWeight: "bold",
                }}
              >
                {ticket.status}
              </td>
              <td style={tableCell}>
                <button
                  onClick={() => deleteTicket(ticket.id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
};

const buttonStyle = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const tableHeader = {
  border: "1px solid #334155",
  padding: "16px",
  background: "#1e293b",
};

const tableCell = {
  border: "1px solid #334155",
  padding: "16px",
  textAlign: "center",
};

export default Tickets;
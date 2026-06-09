import AppLayout from "../layouts/AppLayout";

function Settings() {
  return (
    <AppLayout>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Settings</h1>

      <div style={cardStyle}>
        <h2>Application Settings</h2>
        <p>Manage basic OpsFlow configuration here.</p>

        <div style={{ marginTop: "20px" }}>
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Enter company name"
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>Notification Email</label>
          <input
            type="email"
            placeholder="admin@company.com"
            style={inputStyle}
          />
        </div>

        <button style={buttonStyle}>Save Settings</button>
      </div>
    </AppLayout>
  );
}

const cardStyle = {
  background: "#1f2937",
  padding: "25px",
  borderRadius: "10px",
  maxWidth: "500px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  borderRadius: "6px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
};

const buttonStyle = {
  marginTop: "25px",
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Settings;
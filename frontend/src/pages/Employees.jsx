import AppLayout from "../layouts/AppLayout";

function Employees() {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      role: "Cloud Engineer",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      role: "DevOps Engineer",
      status: "On Leave",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Support Engineer",
      status: "Active",
    },
  ];

  return (
    <AppLayout>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Employees</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        {employees.map((employee) => (
          <div key={employee.id} style={cardStyle}>
            <h2>{employee.name}</h2>
            <p>{employee.role}</p>

            <p
              style={{
                color: employee.status === "Active" ? "#22c55e" : "#f59e0b",
                fontWeight: "bold",
              }}
            >
              {employee.status}
            </p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

const cardStyle = {
  background: "#1f2937",
  padding: "20px",
  borderRadius: "10px",
  width: "250px",
  color: "white",
};

export default Employees;
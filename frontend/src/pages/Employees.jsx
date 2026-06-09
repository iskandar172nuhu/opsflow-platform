import { useEffect, useState } from "react";
import api from "../services/api";
import AppLayout from "../layouts/AppLayout";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AppLayout>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Employees
      </h1>

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

            <p
              style={{
                color: "#cbd5e1",
              }}
            >
              {employee.role}
            </p>

            <p
              style={{
                color:
                  employee.status === "Active"
                    ? "#22c55e"
                    : "#f59e0b",
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
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route
        path="/tickets"
        element={token ? <Tickets /> : <Navigate to="/" />}
      />

      <Route
        path="/employees"
        element={token ? <Employees /> : <Navigate to="/" />}
      />

      <Route
        path="/settings"
        element={token ? <Settings /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/auth");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());
app.use(helmet());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});

// Register user
app.post("/api/auth/register", authLimiter, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, role || "staff"]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).send("Server Error");
  }
});

// Login user
app.post("/api/auth/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).send("Server Error");
  }
});

// Get all tickets
app.get("/api/tickets", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tickets ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Get tickets error:", error.message);
    res.status(500).send("Server Error");
  }
});

// Create ticket
app.post("/api/tickets", authMiddleware, async (req, res) => {
  try {
    const { issue, priority, status } = req.body;

    const result = await pool.query(
      "INSERT INTO tickets (issue, priority, status) VALUES ($1, $2, $3) RETURNING *",
      [issue, priority, status]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Create ticket error:", error.message);
    res.status(500).send("Server Error");
  }
});

// Delete ticket
app.delete("/api/tickets/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM tickets WHERE id = $1", [id]);

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Delete ticket error:", error.message);
    res.status(500).send("Server Error");
  }
});

// Get all employees
app.get("/api/employees", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get employees error:", error.message);
    res.status(500).send("Server Error");
  }
});

// Dashboard metrics
app.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const totalTickets = await pool.query(
      "SELECT COUNT(*) FROM tickets"
    );

    const openTickets = await pool.query(
      "SELECT COUNT(*) FROM tickets WHERE status = 'Open'"
    );

    const resolvedTickets = await pool.query(
      "SELECT COUNT(*) FROM tickets WHERE status = 'Resolved'"
    );

    const totalEmployees = await pool.query(
      "SELECT COUNT(*) FROM employees"
    );

    res.json({
      totalTickets: totalTickets.rows[0].count,
      openTickets: openTickets.rows[0].count,
      resolvedTickets: resolvedTickets.rows[0].count,
      totalEmployees: totalEmployees.rows[0].count,
    });
  } catch (error) {
    console.error("Dashboard metrics error:", error.message);
    res.status(500).send("Server Error");
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "OpsFlow API is running" });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
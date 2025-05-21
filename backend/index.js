// backend/index.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ToDoListApp",
  port: 5432,
  password: "041203",
});

// Example route
app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    console.error("🧵 STACK TRACE:", err.stack);
    res.status(500).send("Database error");
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("Select * from tasks");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).send("Database error");
  }
});
app.post("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query(
      "insert into tasks (taskname, description, dueDate, priority, status) values ($1, $2, $3, $4, $5)",
      [
        req.body.taskname,
        req.body.description,
        req.body.dueDate,
        req.body.priority,
        req.body.status,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).send("Database error");
  }
});

app.get("/api/Administrators/", async (req, res) => {
  try {
    const result = await pool.query("Select * from Administrators");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).send("Database error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

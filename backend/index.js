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
  user: "PutYourUsernameHere",
  host: "localhost",
  database: "PutYourDatabaseNameHere",
  port: 5432,
  password: "PutYourPasswordHere",
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

// 1. Agrega el endpoint GET para tasks que coincide con tu frontend
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).send("Database error");
  }
});


app.post("/api/tasks", async (req, res) => {
  const { userId, taskName, taskDescription, taskDate, taskPriority, taskStatus, taskCategory, taskAttachments } = req.body;
  

  if (!userId || !taskName || !taskDescription || !taskDate || !taskPriority || !taskStatus) {
    return res.status(400).json({ error: "Los campos userId, taskName, taskDescription, taskDate, taskPriority y taskStatus son requeridos" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (userId, taskName, taskDescription, taskDate, taskPriority, taskStatus, taskCategory, taskAttachments) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [userId, taskName, taskDescription, taskDate, taskPriority, taskStatus, taskCategory, taskAttachments]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).json({ error: "Error al crear la tarea" });
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

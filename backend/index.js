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

app.post("/api/users", async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  if (!username || !password || !email || !firstName || !lastName) {
    return res
      .status(400)
      .json({
        error:
          "Fields username, password, email, firstName and lastName are required",
      });
  }

  try {
    // Check if username or email already exists
    const existingUser = await pool.query(
      "SELECT * FROM Users WHERE userName = $1 OR userEmail = $2",
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const result = await pool.query(
      `INSERT INTO Users (userName, userEmail, userPassword, firstName, lastName) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [username, email, password, firstName, lastName]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Example route
app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    console.error("🧵 STACK TRACE:", err.stack);
    res.status(500).send("Database error");
  }
});

// Get user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM Users WHERE userId = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Update user
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, firstName, lastName } = req.body;

  try {
    // Check if username or email already exists for other users
    const existingUser = await pool.query(
      "SELECT * FROM Users WHERE (userName = $1 OR userEmail = $2) AND userId != $3",
      [username, email, id]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const result = await pool.query(
      `UPDATE Users 
       SET userName = $1, userEmail = $2, firstName = $3, lastName = $4
       WHERE userId = $5
       RETURNING *`,
      [username, email, firstName, lastName, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM Users WHERE userId = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).json({ error: "Error deleting user" });
  }
});

app.post("/api/login", async (req, res) => {
  const { userName, password, email } = req.body;

  if (!userName || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM Users WHERE userName = $1 AND userPassword = $2 AND userEmail = $3",
      [userName, password, email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username, password or email" });
    }
    res.json({ 
      message: "Login successful", 
      user: {
        id: result.rows[0].userid,  // Asegúrate de que este campo coincide con tu DB
        ...result.rows[0]
      } 
    });
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).json({ error: "Error logging in" });
  }
});


app.get("/api/tasks", async (req, res) => {
  try {
    const { userId } = req.query;
    const result = await pool.query("SELECT * FROM tasks WHERE userId = $1", [userId] );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).send("Database error");
  }
});

app.post("/api/tasks", async (req, res) => {
  const {
    userId,
    taskName,
    taskDescription,
    taskDate,
    taskPriority,
    taskStatus,
    taskCategory,
    taskAttachments,
  } = req.body;

  if (
    !userId ||
    !taskName ||
    !taskDescription ||
    !taskDate ||
    !taskPriority ||
    !taskStatus
  ) {
    return res
      .status(400)
      .json({
        error:
          "Fields userId, taskName, taskDescription, taskDate, taskPriority and taskStatus are required",
      });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (userId, taskName, taskDescription, taskDate, taskPriority, taskStatus, taskCategory, taskAttachments) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [
        userId,
        taskName,
        taskDescription,
        taskDate,
        taskPriority,
        taskStatus,
        taskCategory,
        taskAttachments,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ DATABASE ERROR:", err.message);
    res.status(500).json({ error: "Error creating task" });
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

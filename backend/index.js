// backend/index.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'PutYourUserNameHere',
  host: 'localhost',
  database: 'DatabaseName',
  port: PutYourPortHere,
  password: 'putYourPasswordHere' 
});

// Example route
app.get('/api/data', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error('❌ DATABASE ERROR:', err.message);
      console.error('🧵 STACK TRACE:', err.stack);
      res.status(500).send('Database error');
    }
  });
  
  app.get('/api/tasks', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM Tasks');
      res.json(result.rows);
    } catch (err) {
      console.error('❌ DATABASE ERROR:', err.message);
      res.status(500).send('Database error');
    }
  });

  app.get('/api/tasks/')
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

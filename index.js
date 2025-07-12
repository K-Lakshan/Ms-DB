const express = require('express');
const { sql, poolPromise } = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.get('/pets', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM pet');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'SQL query failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});


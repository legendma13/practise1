const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 5000;

// MySQL database configuration
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
  port: 3306
});

// API route to get data from MySQL database
app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data from MySQL:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
});

// Create 'users' table if it doesn't exist
db.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)", (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table exists or has been created.');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Insert user data into the 'users' table
    const [result] = await db.promise().execute('INSERT INTO users (id, username, password) VALUES (?, ?, ?)', [1, username, password]);

    console.log("Working as intended", result);

    res.json({ success: true, message: 'Registration successful. You are now logged in.' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Your existing routes and code go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

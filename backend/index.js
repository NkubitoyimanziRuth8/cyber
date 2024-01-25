// index.js

// require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
// const urlDB=`mysql://root:F161aFG5c1gCeD3-4ADECFDgbDdD513F@roundhouse.proxy.rlwy.net:37462/railway`

const db = mysql.createConnection({
  host: 'roundhouse.proxy.rlwy.net',
  user: 'root',
  password: 'F161aFG5c1gCeD3-4ADECFDgbDdD513F',
  database: 'railway',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  // Insert user data into the users table
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    res.json({ success: true, message: 'Registration successful. You are now logged in.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

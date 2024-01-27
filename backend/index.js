// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv')

dotenv.config()

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

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  
  db.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)", (err) => {
    if (err) {
      console.error('Error creating users table:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (insertErr) => {
      if (insertErr) {
        console.error('Error inserting user:', insertErr);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }

      res.json({ success: true, message: 'Registration successful. You are now logged in.' });
    });
  });
});

app.listen(PORT, () => {
  console.log(process.env.MYSQLHOST);
  console.log(`Server is running on port ${PORT}`);
});

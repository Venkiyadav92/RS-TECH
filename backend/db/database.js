// load environment variables from .env file
require('dotenv').config();
const mysql = require('mysql2');
console.log(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_PORT);
// Create connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database');

  // Create table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      department VARCHAR(255),
      designation VARCHAR(255),
      project VARCHAR(255),
      type VARCHAR(255),
      status VARCHAR(255),
      avatar VARCHAR(255)
    )
  `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Employees table ready');
    }
  });
});

module.exports = db;

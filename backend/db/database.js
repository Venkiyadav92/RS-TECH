const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./employee.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      department TEXT,
      designation TEXT,
      project TEXT,
      type TEXT,
      status TEXT,
      avatar TEXT
    )
  `);
});

module.exports = db;

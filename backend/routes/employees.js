const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // path to upload.js
const db = require('../db/database');
const fs = require('fs');
const path = require('path');


// Get all employees
router.get('/', (req, res) => {
  db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get one employee
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Add employee
router.post('/', upload.single('avatar'), (req, res) => {
  const { name, department, designation, project, type, status } = req.body;
  const avatarPath = req.file ? `/uploads/avatars/${req.file.filename}` : null;
  const sql = avatarPath
    ? `INSERT INTO employees (name, department, designation, project, type, status, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)`
    : `INSERT INTO employees (name, department, designation, project, type, status) VALUES (?, ?, ?, ?, ?, ?)`;

  const params = avatarPath
    ? [name, department, designation, project, type, status, avatarPath]
    : [name, department, designation, project, type, status];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, avatar: avatarPath || null });
  });
});


// Update employee (with optional avatar upload)
router.put('/:id', upload.single('avatar'), (req, res) => {
  
  const { name, department, designation, project, type, status } = req.body;
  const newAvatarPath = req.file ? `/uploads/avatars/${req.file.filename}` : null;

  const updateEmployee = (avatarPathToUse) => {
    const sql = avatarPathToUse
      ? `UPDATE employees SET name = ?, department = ?, designation = ?, project = ?, type = ?, status = ?, avatar = ? WHERE id = ?`
      : `UPDATE employees SET name = ?, department = ?, designation = ?, project = ?, type = ?, status = ? WHERE id = ?`;

    const params = avatarPathToUse
      ? [name, department, designation, project, type, status, avatarPathToUse, req.params.id]
      : [name, department, designation, project, type, status, req.params.id];

    db.run(sql, params, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes, avatar: avatarPathToUse || undefined });
    });
  };

  if (newAvatarPath) {
    // Get current avatar from DB first
    db.get('SELECT avatar FROM employees WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (row?.avatar) {
        const oldAvatarFullPath = path.join(process.cwd(), './', row.avatar);
        fs.unlink(oldAvatarFullPath, (unlinkErr) => {
          if (unlinkErr) console.warn('Failed to delete old avatar:', unlinkErr.message);
          updateEmployee(newAvatarPath); // Proceed after deletion attempt
        });
      } else {
        updateEmployee(newAvatarPath); // No old avatar
      }
    });
  } else {
    updateEmployee(null); // No new avatar uploaded
  }
});


// Delete employee
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM employees WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;

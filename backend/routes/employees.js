const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const db = require('../db/database'); // Assuming this now returns MySQL connection
const fs = require('fs');
const path = require('path');

// Get all employees
router.get('/', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get one employee
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]); // MySQL returns array, get first item
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

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, avatar: avatarPath || null });
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

    db.query(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: result.affectedRows, avatar: avatarPathToUse || undefined });
    });
  };

  if (newAvatarPath) {
    // Get current avatar from DB first
    db.query('SELECT avatar FROM employees WHERE id = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results[0]?.avatar) {
        const oldAvatarFullPath = path.join(process.cwd(), './', results[0].avatar);
        fs.unlink(oldAvatarFullPath, (unlinkErr) => {
          if (unlinkErr) console.warn('Failed to delete old avatar:', unlinkErr.message);
          updateEmployee(newAvatarPath);
        });
      } else {
        updateEmployee(newAvatarPath);
      }
    });
  } else {
    updateEmployee(null);
  }
});

// Delete employee
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM employees WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: result.affectedRows });
  });
});

module.exports = router;

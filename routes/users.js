var express = require('express');
var router = express.Router();
const db = require('../config/db');

// Get all users
router.get('/', async function (req, res, next) {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// Post all user
router.post('/', async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password],
    );
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

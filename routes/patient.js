var express = require('express');
var router = express.Router();
const db = require('../config/db');

// Get all patient
router.get('/', async function (req, res, next) {
  try {
    const { rows } = await db.query('SELECT * FROM patient');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// Post patient
router.post('/', async (req, res, next) => {
  const { patientsName, orderId } = req.body;
  try {    
    const { rows } = await db.query(
      'INSERT INTO patient (name, orderId) VALUES ($1, $2) RETURNING *',
      [patientsName, orderId]
    );

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
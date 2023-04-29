var express = require('express');
var router = express.Router();
const db = require('../config/db');

// Get all orders
router.get('/', async function (req, res, next) {
  try {
    const { rows } = await db.query('SELECT * FROM orders');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// Post order, patient and create relation.
router.post('/', async (req, res, next) => {
  const { message, patientsName } = req.body;
  try {
    let patientResponse;
    const { rows: orders } = await db.query(
      'INSERT INTO orders (message) VALUES ($1) RETURNING *',
      [message]
    );
    
    if (patientsName && orders[0]) {
      patientResponse = await db.query(
        'INSERT INTO patient (name, orderId) VALUES ($1, $2) RETURNING *',
        [patientsName, orders[0].id]
      );
    }

    res.json({
      orders: orders[0],
      patient: patientsName && patientResponse.rows ? patientResponse.rows[0] : undefined
    });
  } catch (error) {
    next(error);
  }
});

// Update order
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    await db.query(
      'UPDATE orders SET message = $1 WHERE id = $2',
      [message, id]
    );

    res.json({ successfully: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

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

router.get('/:id', async function (req, res, next) {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
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

router.put('/:id',async (req, res, next) => {
  const { id: orderId } = req.params;
  const { message, patientId } = req.body;
  try {
    const { rows: orders } = await db.query(
      'SELECT * FROM orders WHERE id = $1',
      [orderId]
    );
    const { rows: patients } = await db.query(
      'SELECT * FROM patient WHERE id = $1',
      [patientId]
    );

    // Confirm order and patient are both exist.
    if (!orders || orders.length === 0 || !patients || patients.length === 0) {
      return res.status(400).send('Invalid order id or patient id!!');
    }

    const { rows: patientsFromOrderId } = await db.query(
      'SELECT * FROM patient WHERE orderid = $1',
      [orderId]
    );

    // More than one patients relative to this order.
    if (patientsFromOrderId && patientsFromOrderId.length > 1) {
      const { rows: orders } = await db.query(
        'INSERT INTO orders (message) VALUES ($1) RETURNING *',
        [message]
      );
      await db.query(
        'UPDATE patient SET orderid = $1 WHERE id = $2',
        [orders[0].id, patientId]
      );
    } else {
      await db.query(
        'UPDATE orders SET message = $1 WHERE id = $2',
        [message, orderId]
      );
      // No patient relative to this order.
      if (!patientsFromOrderId || patientsFromOrderId.length === 0) {
        await db.query(
          'UPDATE patient SET orderid = $1 WHERE id = $2',
          [orderId, patientId]
        );
      }
    }

    res.json({ successfully: true });
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

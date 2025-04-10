const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  const { items, totalAmount } = req.body;
  const newOrder = new Order({
    orderId: uuidv4().slice(0, 8),
    items,
    totalAmount
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err });
  }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const Order = require('./models/Order');
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', require('./routes/contact'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI )
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" DB Error:", err));
  app.put('/api/orders/:id', async (req, res) => {
    try {
      const { items, completed, totalAmount } = req.body;
  
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            items,
            completed,
            totalAmount // 👈 Save updated total
          }
        },
        { new: true }
      );
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error updating order', error });
    }
  });
  
  app.get('/api/orders', async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }); // Latest first
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching orders', error: err });
    }
  });
  
// Save Order API
app.post('/api/orders', async (req, res) => {
  const { items, totalAmount } = req.body;
  const newOrder = new Order({
    orderId: uuidv4().slice(0, 8), // short order id
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

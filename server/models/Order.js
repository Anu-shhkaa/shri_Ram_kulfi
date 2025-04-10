const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  //customerName: String, // Add this
  items: Array,
  totalAmount: Number,
  completed: { type: Boolean, default: false }, // For grey-out
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

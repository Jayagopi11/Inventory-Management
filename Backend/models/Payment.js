const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  type: { type: String, enum: ["customer", "vendor"], required: true },
  name: String,
  amount: Number,
  method: String, 
  date: { type: Date, default: Date.now },
  notes: String,
});

module.exports = mongoose.model("Payment", paymentSchema);

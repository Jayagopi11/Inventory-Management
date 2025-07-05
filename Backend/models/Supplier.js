const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["supplier", "customer"], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String } 
});

module.exports = mongoose.model("Contact", supplierSchema);


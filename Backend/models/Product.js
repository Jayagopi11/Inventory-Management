const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    description: { type: String },
    threshold: { type: Number, default: 10,},
    category: { type: String, required: true },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Product", productSchema);

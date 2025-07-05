
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    supplier: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    // purchaseDate: {
    //   type: Date,
    //   default: Date.now,
    // },
    cost: {
      type: Number,
      required: true,
      min: [0, "Cost must be a positive number"],
    },
    date: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Purchase", purchaseSchema);

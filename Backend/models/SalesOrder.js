const mongoose = require("mongoose");

const SalesOrderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    address: String,
    orderDate: { type: Date, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesOrder", SalesOrderSchema);

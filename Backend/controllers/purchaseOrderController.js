const Purchase = require("../models/PurchaseOrder");
const mongoose = require("mongoose");

// Add Purchase///
exports.addPurchase = async (req, res) => {
  try {
    const { item, brand, supplier, productId, quantity, cost, date } = req.body;

    // Basic validation///
    if (!item || !brand || !supplier || !productId || !quantity || !cost) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate ObjectId///
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const purchase = new Purchase({
      item,
      brand,
      supplier,
      productId,
      quantity,
      cost,
      date: date || Date.now(),
    });

    const saved = await purchase.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Add Purchase Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all purchases///
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Purchase///
exports.updatePurchase = async (req, res) => {
  try {
    const updated = await Purchase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete Purchase///
exports.deletePurchase = async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

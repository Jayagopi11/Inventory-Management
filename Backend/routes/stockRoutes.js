const express = require("express");
const mongoose = require("mongoose");
const {
  createStock,
  deleteStock,
  updateStock,
} = require("../controllers/stockController.js");
const Product = require('../models/Product.js');
const Purchase = require('../models/PurchaseOrder.js');
const Sale = require('../models/SalesOrder.js')
const router = express.Router();
const StockController = require('../controllers/stockController');
const { getAllSalesOrders } = require("../controllers/salesOrderController.js");

// router.get('/',getStocks);

router.get('/stocks', async (req, res) => {
  try {
    const products = await Product.find();

    const stockReport = await Promise.all(
      products.map(async (product) => {
        const purchasedDocs = await Purchase.find({ productId: product._id });
        const soldDocs = await Sale.find({ productId: product._id });

        const purchased = purchasedDocs.reduce((sum, p) => sum + p.quantity, 0);
        const sold = soldDocs.reduce((sum, s) => sum + s.quantity, 0);
        const remaining = purchased - sold;

        return {
          name: product.name,
          brand: product.brand,
          Category: product.category,
          purchased,
          sold,
          remaining,
          threshold: product.threshold,
          status: remaining < product.threshold ? 'Low' : 'OK',
        };
      })
    );

    res.json(stockReport);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/report', StockController.getStockReport);

router.post("/", createStock);

router.put("/:id", updateStock);

router.delete("/:id", deleteStock);

router.get("/", getAllSalesOrders);

module.exports = router;

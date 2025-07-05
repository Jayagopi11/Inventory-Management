const express = require('express');
const router = express.Router();
const SalesOrder = require('../models/SalesOrder');
const { getSalesOrders } = require("../controllers/salesOrderController");


router.get("/", getSalesOrders);
// GET all sales orders///
router.get('/', async (req, res) => {
  try {
    const salesOrders = await SalesOrder.find().populate('items.productId', 'name sku');
    res.json(salesOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales orders', error });
  }
});

// GET a single sales order by ID///
router.get('/:id', async (req, res) => {
  try {
    const salesOrder = await SalesOrder.findById(req.params.id).populate('items.productId', 'name sku');
    if (!salesOrder) return res.status(404).json({ message: 'Sales order not found' });
    res.json(salesOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales order', error });
  }
});

// POST a new sales order///
router.post('/', async (req, res) => {
  try {
    const newSalesOrder = new SalesOrder(req.body);
    const savedOrder = await newSalesOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating sales order', error });
  }
});

// PUT update a sales order///
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await SalesOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Sales order not found' });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating sales order', error });
  }
});

// DELETE a sales order///
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await SalesOrder.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Sales order not found' });
    res.json({ message: 'Sales order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sales order', error });
  }
});

module.exports = router;

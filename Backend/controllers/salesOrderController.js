const SalesOrder = require("../models/SalesOrder");

exports.getSalesOrders = async (req, res) => {
  try {
    const salesOrders = await SalesOrder.find();
    res.status(200).json(salesOrders);
  } catch (err) {
    res.status(500).json({ error: "Failer to fetch sales Orders" });
  }
};

exports.addSalesOrder = async (req, res) => {
  try {
    const { customerName, orderDate, totalAmount } = res.body;

    const newOrder = new SalesOrder({
      customerName,
      orderDate,
      totalAmount,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to add sales order" });
  }
};

exports.updateSalesOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await SalesOrder.findByIdAndUpdate(
      id,
      {
        customerName: req.body.customerName,
        address: req.body.address,
        orderDate: req.body.orderDate,
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: req.body.price,
        status: req.body.status,
      },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to update sales order" });
  }
};

exports.deleteSalesOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SalesOrder.findByIdAndDelete(id);

    if (!deleted)
      return res.status(400).json({ error: "Sales order not found" });

    res.status(200).json({ message: "Sales order deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete sales order" });
  }
};

exports.getAllSalesOrders = async (req, res) => {
  try {
    const sales = await SalesOrder.find().populate("productId"); // important
    res.status(200).json(sales);
  } catch (error) {
    console.error("🔥 Sales GET Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
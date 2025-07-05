// // routes/purchase.routes.js
// const express = require('express');
// const router = express.Router();
// const Purchase = require('../models/PurchaseOrder');
// const {addPurchase} = require('../controllers/purchaseOrderController')

// // GET all
// router.get('/', async (req, res) => {
//   const purchases = await Purchase.find();
//   res.json(purchases);
// });


// // POST
// // router.post('/', async (req, res) => {
// //   const purchase = new Purchase(req.body);
// //   await purchase.save();
// //   res.json(purchase);
// // });
// router.post('/', addPurchase);

// // PUT
// router.put('/:id', async (req, res) => {
//   const updated = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// // DELETE
// router.delete('/:id', async (req, res) => {
//   await Purchase.findByIdAndDelete(req.params.id);
//   res.sendStatus(204);
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  addPurchase,
  getAllPurchases,
  updatePurchase,
  deletePurchase,
} = require("../controllers/purchaseOrderController");

router.get("/", getAllPurchases);

router.post("/", addPurchase);

router.put("/:id", updatePurchase);

router.delete("/:id", deletePurchase);

module.exports = router;

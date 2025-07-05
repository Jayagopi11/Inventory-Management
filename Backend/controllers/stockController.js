const Stock = require('../models/Supplier');
const Product = require('../models/Product');
const Purchase = require('../models/PurchaseOrder');
const Sales = require('../models/SalesOrder');
const { sendMail } = require('../middlewares/email'); 

const getStockReport = async (req, res) => {
  try {
    const products = await Product.find(); 

    const stockData = await Promise.all(
      products.map(async (product) => {
        const purchases = await PurchaseOrder.find({ product: product._id });
        const totalPurchased = purchases.reduce((sum, p) => sum + p.quantity, 0);


        const sales = await SalesOrder.find({ product: product._id });
        const totalSold = sales.reduce((sum, s) => sum + s.quantity, 0);


        const remaining = totalPurchased - totalSold;

        let status = "In Stock";
        if (remaining < 1) {
          status = "Out of Stock";
        } else if (remaining < product.threshold) {
          status = "Low";
        }

        return {
          _id: product._id,
          name: product.name,
          brand: product.brand,
          Category: product.category,
          purchased: totalPurchased,
          sold: totalSold,
          remaining,
          threshold: product.threshold || 5,
          status,
        };
      })
    );

    res.json(stockData);
  } catch (err) {
    console.error("Error generating stock report:", err);
    res.status(500).json({ message: "Failed to fetch stock report" });
  }
};



// ✅ Low stock report logic + email

// const getStockReport = async (req, res) => {
//   try {
//     const products = await Product.find();

//     const stockData = [];
//     const lowStockItems = [];

//     for (const product of products) {
//       const purchases = await Purchase.find({ productId: product._id });
//       const totalPurchased = purchases.reduce((sum, p) => sum + p.quantity, 0);

//       const sales = await Sales.find({ productId: product._id });
//       const totalSold = sales.reduce((sum, s) => sum + s.quantity, 0);

//       const remaining = totalPurchased - totalSold;
//       let status = "In Stock";

//       if (remaining < 1) {
//         status = "Out of Stock";
//       } else if (remaining < product.threshold) {
//         status = "Low";

//         // ✅ Collect low stock items
//         lowStockItems.push({
//           name: product.name,
//           remaining,
//           threshold: product.threshold,
//         });
//       }

//       stockData.push({
//         _id: product._id,
//         name: product.name,
//         brand: product.brand,
//         category: product.category,
//         purchased: totalPurchased,
//         sold: totalSold,
//         remaining,
//         threshold: product.threshold || 5,
//         status,
//       });
//     }

//     // ✅ Send email once if any low stock
//     if (lowStockItems.length > 0) {
//       const lowStockHtml = `
//         <h2>🚨 Low Stock Alert</h2>
//         <p>The following products are below their threshold:</p>
//         <table border="1" cellpadding="8" cellspacing="0">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Remaining</th>
//               <th>Threshold</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${lowStockItems
//               .map(
//                 (item) => `
//               <tr>
//                 <td>${item.name}</td>
//                 <td>${item.remaining}</td>
//                 <td>${item.threshold}</td>
//               </tr>
//             `
//               )
//               .join("")}
//           </tbody>
//         </table>
//         <p style="color: red;">Please restock these products immediately.</p>
//       `;

//       await sendMail({
//         to: "vendajayagopi11@gmail.com",
//         subject: "🚨 Low Stock Alert - Multiple Products",
//         html: lowStockHtml,
//       });
//     }

//     res.status(200).json(stockData);
//   } catch (err) {
//     console.error("❌ Error generating stock report:", err);
//     res.status(500).json({ message: "Failed to fetch stock report" });
//   }
// };


 const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate('productId');
    console.log('Stocks:', stocks);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stock items', error });
  }
};

 const getStockById = async(req,res) => {
    try{
        const stock = await Stock.findById(req.params.id).populate('producId','name');
        if(!stock){
            return res.status(404).json({message:'Stock item not found'});
        }
        res.status(200).json(stock);
    }catch(error){
        res.status(500).json({message:'Failed to fetch stock item',error});

    }
};

 const createStock = async(req,res) => {
    try{
        const {productId,quantity,location} = req.body;

        const newStock = new Stock({
            productId,
            quantity,
            location,
        });

        const savedStock = await newStock.save();
        res.status(201).json(savedStock);
    }catch(error){
        res.status(400).json({message:'Failed to create stock item',error});

    }
};

//pervious working code

//  const updateStock = async(req,res) => {
//     try{
//         const{productId,quantity,location} = req.body;

//         const updateStock = await Stock.findByIdAndUpdate(
//             req.params.id,
//             {productId,quantity,location},
//             {new:true}
//         );

//         if(!updateStock){
//             return res.status(404).json({message:'Stock item not found'});
    
//         }
//         res.status(200).json(updateStock);

//     }catch(error){
//         res.status(400).json({message:'Failed to update stock item',error});

//     }
// }



const updateStock = async (req, res) => {
  try {
    const { productId, quantity, location } = req.body;

    const updatedStock = await Stock.findByIdAndUpdate(
      req.params.id,
      { productId, quantity, location },
      { new: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    // ✅ Calculate remaining stock
    const purchases = await Purchase.find({ productId });
    const totalPurchased = purchases.reduce((sum, p) => sum + p.quantity, 0);

    const sales = await Sales.find({ productId });
    const totalSold = sales.reduce((sum, s) => sum + s.quantity, 0);

    const remaining = totalPurchased - totalSold;

    // ✅ Get product details
    const product = await Product.findById(productId);
    const threshold = product?.threshold || 10;

    // ✅ Check and send email if stock is low
    if (remaining < threshold) {
      await sendMail({
        to: "vendajayagopi11@gmail.com",
        subject: `🚨 Low Stock Alert: ${product.name}`,
        html: `
          <h2>Low Stock Alert</h2>
          <p><strong>Product:</strong> ${product.name}</p>
          <p><strong>Remaining:</strong> ${remaining}</p>
          <p><strong>Threshold:</strong> ${threshold}</p>
          <p style="color: red;">Please restock this product immediately!</p>
        `,
      });
    }

    // ✅ Send response
    res.status(200).json(updatedStock);
  } catch (error) {
    console.error("❌ Error in updateStock:", error);
    res.status(400).json({ message: "Failed to update stock item", error });
  }
};


// const updateStock = async (req, res) => {
//   try {
//     const { productId, quantity, location } = req.body;

//     const updatedStock = await Stock.findByIdAndUpdate(
//       req.params.id,
//       { productId, quantity, location },
//       { new: true }
//     );

//     if (!updatedStock) {
//       return res.status(404).json({ message: "Stock item not found" });
//     }

//     // ✅ Check current stock
//     const purchases = await Purchase.find({ productId });
//     const totalPurchased = purchases.reduce((sum, p) => sum + p.quantity, 0);

//     const sales = await Sales.find({ productId });
//     const totalSold = sales.reduce((sum, s) => sum + s.quantity, 0);

//     const remaining = totalPurchased - totalSold;

//     const product = await Product.findById(productId);
//     const threshold = product?.threshold || 5;

//     if (remaining < threshold) {
//       await sendMail({
//         to: "vendajayagopi11@gmail.com",
//         subject: `🚨 Low Stock Alert: ${product.name}`,
//         html: `
//           <h2>Low Stock Alert</h2>
//           <p><strong>Product:</strong> ${product.name}</p>
//           <p><strong>Remaining:</strong> ${remaining}</p>
//           <p><strong>Threshold:</strong> ${threshold}</p>
//           <p style="color: red;">Please restock this product immediately!</p>
//         `,
//       });
//     }

//     res.status(200).json(updatedStock);
//   } catch (error) {
//     console.error("❌ Error in updateStock:", error);
//     res.status(400).json({ message: "Failed to update stock item", error });
//   }
// };

 const deleteStock = async (req,res) => {
    try{
        const deleteStock = await Stock.findByIdAndDelete(req.params.id);

        if(!deleteStock){
            return res.status(404).json({message:'Stock item not found'});

        }
        res.status(200).json({message:'Stock item not found'});
    }catch(error){
        res.status(500).json({message:'Failed to delete stock item',error})
    }
}


module.exports = {
  getStocks,
  getStockReport,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};
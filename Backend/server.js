const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const salesRoutes = require("./routes/salesRoutes");
const stockRoutes = require("./routes/stockRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/auth");
const { errorHandler } = require("./middlewares/errorHandler");
const paymentRoutes = require("./routes/paymentRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const { sendMail } = require("./middlewares/email");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB///
connectDB();

// Middleware////
app.use(cors());
app.use(express.json());

/// MongoDB connection///
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

/// API Routes///
app.use("/api/products", productRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api", stockRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);

/// Error Handling Middleware///
app.use(errorHandler);

/// Root///
app.get("/", (req, res) => {
  res.send("Inventory and Order Management API is running...");
});

// ✅ Route to test email
// app.get("/test-email", async (req, res) => {
//   try {
//     console.log("📨 Sending test email...");
//     await sendMail({
//       to: "vendajayagopi11@gmail.com",
//       subject: "✅ Nodemailer Test Email",
//       html: "<h2>This is a test email from your Node.js server</h2>",
//     });

//     console.log("✅ Email logic executed");
//     res.send("✅ Test email sent (check your inbox/spam)");
//   } catch (error) {
//     console.error("❌ Error sending test email:", error);
//     res.status(500).send("❌ Failed to send test email");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

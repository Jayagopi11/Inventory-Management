const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  type: { type: String, enum: ["purchase", "sales", "stock", "activity"], required: true },
  data: mongoose.Schema.Types.Mixed,
  generatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", reportSchema);

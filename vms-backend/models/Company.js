const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    location: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);

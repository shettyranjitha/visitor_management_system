
const mongoose = require("mongoose");

const passSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true
  },
  passId: {
    type: String,
    required: true,
    unique: true
  },
  validTill: Date,
  qrCode: String,
}, { timestamps: true });

module.exports = mongoose.model("Pass", passSchema);

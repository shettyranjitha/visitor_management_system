const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email : { type: String, required: true},
    idProof: { type: String, required: true },
    photo: { type: String }, // image filename/path
    visitingCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    visitingPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    visitorType: {
      type: String,
      enum: ["Contractor", "Vendor", "VIP", "Delegate", "Normal"],
      default: "Normal"
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected","checked-in", "checked-out"],
      default: "pending"
    },
    duration: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);

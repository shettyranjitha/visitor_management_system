const Pass = require("../models/Pass");
const Visitor = require("../models/Visitor");
const sendApprovalEmail = require("../utils/sendEmail");

// Generate random pass ID
function generatePassId() {
  return "PASS-" + Math.random().toString(36).substr(2, 8).toUpperCase();
}

exports.generatePass = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.visitorId)
      .populate("visitingPerson", "name email") // Host
      .populate("visitingCompany", "companyName");

    if (!visitor) return res.status(404).json({ error: "Visitor not found" });

    const passId = generatePassId();

    const pass = new Pass({
      visitor: visitor._id,
      passId,
      validTill: new Date(Date.now() + visitor.duration * 60000),
      // qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${passId}`
    });

    await pass.save();

    const passUrl = `http://localhost:5000/api/passes/${pass._id}`;

    // Send email to both visitor & host
    await sendApprovalEmail(visitor, passUrl, pass.passId);

    res.json({ message: "Pass generated & emails sent", pass });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

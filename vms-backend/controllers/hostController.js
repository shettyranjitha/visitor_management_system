const User = require("../models/User");
const Visitor = require("../models/Visitor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");


exports.hostLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find only users with role = host
    const host = await User.findOne({ email, role: "host" });

    if (!host) {
      return res.status(400).json({ message: "Host not found" });
    }

    const isMatch = await bcrypt.compare(password, host.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: host._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      host
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({
      visitingPerson: req.user.id
    })
    .populate("visitingCompany", "companyName")
    .populate("visitingPerson", "name email");

    res.json(visitors);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.approveVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id)
      .populate("visitingCompany", "companyName")
      .populate("visitingPerson", "name email");

    if (!visitor)
      return res.status(404).json({ error: "Visitor not found" });

    visitor.status = "approved";
    await visitor.save({ validateBeforeSave: false });

    const passUrl = `http://localhost:5000/pass.html?id=${visitor._id}`;

    // Response immediately to frontend pege
    res.json({
      message: "Visitor approved successfully",
      visitor,
    });

    // Send emails 
    sendEmail(
      visitor.email,
      "Your Visitor Pass is Approved ✔",
      `
        <h2>Hello ${visitor.name},</h2>
        <p>Your visit has been <b>approved</b> by ${visitor.visitingPerson.name}.</p>
        <p><b>Company:</b> ${visitor.visitingCompany.companyName}</p>
        <p><b>Duration:</b> ${visitor.duration || "N/A"} Days</p><br>
        <a href="${passUrl}" style="padding:10px 15px;background:#28a745;color:white;text-decoration:none;">
          Check-out
        </a>
      `
    ).catch(err => console.error("❌ Visitor email failed:", err));

    sendEmail(
      visitor.visitingPerson.email,
      "Visitor Approved ✔",
      `
        <h2>Hello ${visitor.visitingPerson.name},</h2>
        <p>You have approved the following visitor:</p>
        <p><b>Name:</b> ${visitor.name}</p>
        <p><b>Mobile:</b> ${visitor.mobile}</p>
        <p><b>Visitor Type:</b> ${visitor.visitorType}</p>
        <p><b>Company:</b> ${visitor.visitingCompany.companyName}</p><br>
        <a href="${passUrl}" style="padding:10px 15px;background:#007bff;color:white;text-decoration:none;">
          Check-out
        </a>
      `
    ).catch(err => console.error("❌ Host email failed:", err));

  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.rejectVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor)
      return res.status(404).json({ error: "Visitor not found" });

    visitor.status = "rejected";
    await visitor.save({validateBeforeSave:false});

    res.json({ message: "Visitor rejected", visitor });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

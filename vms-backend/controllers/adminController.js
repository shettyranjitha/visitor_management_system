const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Visitor = require("../models/Visitor");
const User = require("../models/User");
const Company = require("../models/Company");

// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login success", token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    const totalHosts = await User.countDocuments({ role: "host" });
    const totalCompanies = await Company.countDocuments();

    res.status(200).json({
      totalVisitors,
      totalHosts,
      totalCompanies
    });
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};



//  Get Recent Visitors upto 10
exports.getRecentVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .populate({ path: "visitingCompany", select: "companyName" })
      .populate({ path: "visitingPerson", select: "name" })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(visitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



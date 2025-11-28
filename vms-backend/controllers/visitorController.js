const Visitor = require("../models/Visitor");
const sendEmail = require("../utils/sendEmail");
require("../models/Company");
require("../models/User");

exports.createVisitor = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (!req.files || !req.files.idProof) {
      return res.status(400).json({ error: "idProof file is required" });
    }

    const visitor = new Visitor({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      visitorType: req.body.visitorType,
      visitingCompany: req.body.visitingCompany,
      visitingPerson: req.body.visitingPerson,
      duration: req.body.duration,
      photo: req.files.photo?.[0]?.filename || null,
      idProof: req.files.idProof?.[0]?.filename,
    });

    await visitor.save();
    res.status(200).json({ message: "Visitor created successfully", visitor });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .populate({ path: "visitingCompany", select: "companyName", strictPopulate: false })
      .populate({ path: "visitingPerson", select: "name email", strictPopulate: false });

    return res.status(200).json(visitors);

  } catch (err) {
    console.error("GET VISITORS ERROR", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getVisitorById = async(req ,res) => {
  try {
    const visitor = await Visitor.findById(req.params.id)
    .populate({path : "visitingCompany" , select: "companyName" , strictPopulate: false })
    .populate({path : "visitingPerson" , select: "name email", strictPopulate: false});

    if(!visitor) {
      return res.status(404).json({error:"Visitor not found."})
    }
    res.status(200).json({visitor});

  } catch (err){
    console.log(err);
    res.status(500).json({ error:"Server error"})
  }
};


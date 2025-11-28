const Company = require("../models/Company");

exports.createCompany = async (req, res) => {
  try {
    const { companyName, location } = req.body;

    const company = await Company.create({ companyName, location });

    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
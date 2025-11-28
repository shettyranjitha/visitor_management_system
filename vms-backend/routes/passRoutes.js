const express = require("express");
const router = express.Router();
const { generatePass } = require("../controllers/passController");

router.post("/:visitorId", generatePass);
// router.get("/:id", getPass);

module.exports = router;

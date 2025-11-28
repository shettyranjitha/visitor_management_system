const express = require("express");
const router = express.Router();
const { getAdminStats, getRecentVisitors } = require("../controllers/adminController");

router.get("/stats", getAdminStats);
router.get("/recent-visitors", getRecentVisitors);

module.exports = router;

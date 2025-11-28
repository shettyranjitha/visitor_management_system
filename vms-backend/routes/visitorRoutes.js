const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { createVisitor, getVisitors ,getVisitorById } = require("../controllers/visitorController");

// Upload 2 files + send body fields
router.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "idProof", maxCount: 1 }
  ]),
   
  createVisitor
);

router.get("/", getVisitors);

router.get("/:id",getVisitorById);

// router.put("/approve/:id", approveVisitor);


module.exports = router;

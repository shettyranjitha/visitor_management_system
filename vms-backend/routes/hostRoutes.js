// const express = require("express");
// const router = express.Router();
// const { hostLogin  } = require("../controllers/hostController");

// router.post("/login", hostLogin);

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  hostLogin,
  getMyVisitors,
  approveVisitor,
  rejectVisitor
} = require("../controllers/hostController");

router.post("/login", hostLogin);
router.get("/visitors", auth, getMyVisitors);
router.put("/approve/:id", auth, approveVisitor);
router.put("/reject/:id", auth, rejectVisitor);


module.exports = router;

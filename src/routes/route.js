const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const internController = require("../controllers/internController")

/******************** create college  ******************************/
router.post("/functionup/colleges", collegeController.createCollege);

/***********************create intern ******************************/
router.post("/functionup/interns",internController.createIntern);

/**************************collge Details ***********************/
router.get("/functionup/collegeDetails",internController.getInterns)

module.exports = router;

// 
const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const {

    uploadEvidence

} = require("../controllers/evidenceController");

// Upload Evidence

router.post(

    "/upload/:caseId",

    protect,

    authorize("Police", "Admin"),

    upload.single("evidence"),

    uploadEvidence

);

module.exports = router;
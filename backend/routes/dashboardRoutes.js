const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    getDashboardSummary,
    getEvidenceStatus,
    getRecentEvidence,
    getRecentActivities
} = require("../controllers/dashboardController");


// ==========================================
// Dashboard Summary
// ==========================================

router.get(
    "/summary",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    getDashboardSummary
);


// ==========================================
// Evidence Status Statistics
// ==========================================

router.get(
    "/evidence-status",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    getEvidenceStatus
);


// ==========================================
// Recent Evidence
// ==========================================

router.get(
    "/recent-evidence",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    getRecentEvidence
);


// ==========================================
// Recent Activities
// ==========================================

router.get(
    "/recent-activities",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    getRecentActivities
);


module.exports = router;
const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    uploadEvidence,
    getAllEvidence,
    getEvidenceById,
    downloadEvidence,
    verifyEvidence,
    updateEvidence,
    deleteEvidence,
    viewEvidence,
    getEvidenceHistory
} = require("../controllers/evidenceController");


// =======================
// Upload Evidence
// =======================

router.post(
    "/upload/:caseId",
    protect,
    authorize("Police", "Admin"),
    upload.single("evidence"),
    uploadEvidence
);


// =======================
// Get All Evidence
// =======================

router.get(
    "/",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    getAllEvidence
);


// =======================
// Download Evidence
// =======================

router.get(
    "/download/:id",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    downloadEvidence
);


// =======================
// Verify Evidence Integrity
// =======================

router.get(
    "/verify/:id",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    verifyEvidence
);


// =======================
// View Evidence
// =======================

router.get(
    "/view/:id",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    viewEvidence
);


// =======================
// Chain of Custody Timeline
// =======================

router.get(
    "/history/:id",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    getEvidenceHistory
);


// =======================
// Get Evidence By ID
// (Keep after all specific GET routes)
// =======================

router.get(
    "/:id",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    getEvidenceById
);


// =======================
// Update Evidence
// =======================

router.put(
    "/:id",
    protect,
    authorize("Admin", "Police"),
    updateEvidence
);


// =======================
// Soft Delete Evidence
// =======================

router.delete(
    "/:id",
    protect,
    authorize("Admin"),
    deleteEvidence
);


module.exports = router;
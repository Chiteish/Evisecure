const express = require("express");
const router = express.Router();

const {
    createCase,
    getAllCases,
    getCaseById,
    updateCase,
    deleteCase
} = require("../controllers/caseController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Create Case
router.post(
    "/",
    protect,
    authorize("Admin", "Police"),
    createCase
);

// Get All Cases
router.get(
    "/",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    getAllCases
);

// Get Case By ID
router.get(
    "/:id",
    protect,
    authorize("Admin", "Police", "Judge", "Forensic"),
    getCaseById
);

// Update Case
router.put(
    "/:id",
    protect,
    authorize("Admin", "Police"),
    updateCase
);

// Delete Case
router.delete(
    "/:id",
    protect,
    authorize("Admin"),
    deleteCase
);

module.exports = router;
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Anyone logged in
router.get("/profile", protect, (req, res) => {

    res.json({
        message: "Protected Route Accessed Successfully",
        loggedInUser: req.user
    });

});

// Only Admin
router.get(
    "/admin",
    protect,
    authorize("Admin"),
    (req, res) => {

        res.json({
            message: "Welcome Admin!"
        });

    }
);

// Police + Admin
router.get(
    "/police",
    protect,
    authorize("Police", "Admin"),
    (req, res) => {

        res.json({
            message: "Welcome Police Officer!"
        });

    }
);

// Judge + Admin
router.get(
    "/judge",
    protect,
    authorize("Judge", "Admin"),
    (req, res) => {

        res.json({
            message: "Welcome Judge!"
        });

    }
);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Only Admin can create users
router.post(
    "/create-user",
    protect,
    authorize("Admin"),
    createUser
);
router.get(
    "/users",
    protect,
    authorize("Admin"),
    getAllUsers
);
router.get(
    "/users/:id",
    protect,
    authorize("Admin"),
    getUserById
);
router.put(
    "/users/:id",
    protect,
    authorize("Admin"),
    updateUser
);
router.delete(
    "/users/:id",
    protect,
    authorize("Admin"),
    deleteUser
);

module.exports = router;
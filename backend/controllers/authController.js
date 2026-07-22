const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// Login User
// ==========================
const loginUser = async (req, res) => {
    try {
        const { employeeId, password } = req.body;

        // Check if all fields are provided
        if (!employeeId || !password) {
            return res.status(400).json({
                message: "Employee ID and Password are required."
            });
        }

        // Find user by Employee ID
        const user = await User.findOne({ employeeId });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Employee ID or Password."
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Employee ID or Password."
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                employeeId: user.employeeId,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    loginUser
};